let results = [];

chrome.runtime.onMessage.addListener((req) => {
  if (req.action === 'run') {
    results = [];
    req.jobs.forEach(job => {
      job.urls.forEach(site => {
        chrome.tabs.create({ url: site }, (tab) => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
          }, () => {
            setTimeout(() => {
              chrome.tabs.sendMessage(tab.id, {
                keyword: job.keyword,
                site: site
              });
            }, 2000);
          });
        });

        const query = `site:${site} inanchor:"${job.keyword}"`;
        const searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}&num=100`;
        chrome.tabs.create({ url: searchURL });

        results.push({ site, keyword: job.keyword, anchors: [] });
      });
    });
  }

  if (req.action === 'foundAnchors') {
    const { site, keyword, anchors } = req;
    const match = results.find(r => r.site.includes(site) && r.keyword === keyword);
    if (match) match.anchors = anchors;
  }
});
