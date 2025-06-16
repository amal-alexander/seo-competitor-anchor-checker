document.getElementById('runButton').addEventListener('click', () => {
  let mainLines = document.getElementById('kwUrls').value.trim().split('\n');
  let extraKeywords = document.getElementById('extraKeywords').value.trim().split(',').map(k => k.trim()).filter(k => k);
  let extraDomains = document.getElementById('extraDomains').value.trim().split(',').map(d => d.trim()).filter(d => d);

  let jobs = [];

  // Standard jobs from text area
  mainLines.forEach(line => {
    let [keyword, ...urls] = line.split(',').map(s => s.trim());
    if (keyword && urls.length) {
      jobs.push({ keyword, urls: urls.slice(0, 3).concat(extraDomains) });
    }
  });

  // Add extra keywords with extra domains
  extraKeywords.forEach(keyword => {
    if (extraDomains.length) {
      jobs.push({ keyword, urls: extraDomains });
    }
  });

  // YouTube-specific job
  const ytKeyword = document.getElementById('ytKeyword').value.trim();
  const ytChannel = document.getElementById('ytChannel').value.trim();

  if (ytKeyword && ytChannel) {
    const cleaned = ytChannel
      .replace(/^https?:\/\/(www\.)?youtube\.com\//, '')  // remove full URL
      .replace(/^@/, ''); // clean "@"

    // Build URL like youtube.com/@channel or youtube.com/c/channelname
    jobs.push({ keyword: ytKeyword, urls: [`https://www.youtube.com/${cleaned}`] });
  }

  if (jobs.length === 0) {
    alert("Please enter at least one keyword with competitor URLs or YouTube data.");
    return;
  }

  chrome.runtime.sendMessage({ action: 'run', jobs });
});
