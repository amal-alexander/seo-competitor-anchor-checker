chrome.runtime.onMessage.addListener((msg) => {
  if (!msg.keyword) return;

  // Wait for the page to fully load
  if (document.readyState === 'complete') {
    highlightAnchors(msg.keyword);
  } else {
    window.addEventListener('load', () => {
      highlightAnchors(msg.keyword);
    });
  }
});

function highlightAnchors(keyword) {
  let keywordLower = keyword.toLowerCase();

  let anchors = Array.from(document.querySelectorAll('a'))
    .filter(a =>
      a.textContent.toLowerCase().includes(keywordLower) &&
      a.offsetParent !== null
    )
    .map(a => {
      a.style.backgroundColor = 'yellow';
      return {
        text: a.textContent.trim(),
        href: a.href
      };
    });

  chrome.runtime.sendMessage({
    action: 'foundAnchors',
    site: window.location.origin,
    keyword: keyword,
    anchors
  });
}
