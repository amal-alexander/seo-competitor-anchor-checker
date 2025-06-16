let results = [];

chrome.runtime.onMessage.addListener((req) => {
  if (req.action === 'run') {
    results = [];
    req.jobs.forEach(job => {
      job.urls.forEach(site => {
        // Open the actual site in a new tab and inject content.js
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

        // Determine query logic
        let query;
        if (site.includes("youtube.com")) {
          // Extract YouTube channel identifier
          const channelName = new URL(site).pathname.split('/').filter(Boolean).pop();
          query = `site:youtube.com "${job.keyword}" "${channelName}"`;
        } else {
          query = `site:${site} inanchor:"${job.keyword}"`;
        }

        // Google search URL for up to 100 results
        const searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}&num=100`;
        chrome.tabs.create({ url: searchURL });

        // Store results reference
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
