document.getElementById('runButton').addEventListener('click', () => {
  let mainLines = document.getElementById('kwUrls').value.trim().split('\n');
  let extraKeywords = document.getElementById('extraKeywords').value.trim().split(',').map(k => k.trim()).filter(k => k);
  let extraDomains = document.getElementById('extraDomains').value.trim().split(',').map(d => d.trim()).filter(d => d);

  let jobs = [];

  mainLines.forEach(line => {
    let [keyword, ...urls] = line.split(',').map(s => s.trim());
    if (keyword && urls.length) {
      jobs.push({ keyword, urls: urls.slice(0, 3).concat(extraDomains) });
    }
  });

  extraKeywords.forEach(keyword => {
    if (extraDomains.length) {
      jobs.push({ keyword, urls: extraDomains });
    }
  });

  if (jobs.length === 0) {
    alert("Please enter at least one keyword with competitor URLs.");
    return;
  }

  chrome.runtime.sendMessage({ action: 'run', jobs });
});
