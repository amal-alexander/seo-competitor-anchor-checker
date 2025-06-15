
# SEO Competitor Anchor Checker — Chrome Extension

A lightweight Chrome extension built for **manual SEO competitor analysis**.


## 📌 Features:

- **Checks competitor sites for keyword-based anchors.**
- Highlights all anchor (`<a>`) tags containing your target keywords — directly on the competitor’s page.
- Performs **Google "inanchor" searches** — opens the top 100 results in one click (`num=100`).
- Manual-focused — no CSV export built-in (you can use any scraping extension to collect data from opened results).

---

## ⚙️ Tech Stack:

- **Chrome Extension — Manifest V3 (MV3)**
- **Chrome Scripting API** (to dynamically inject `content.js` after page load)
- **Content Script waits for full page load** (`window.addEventListener('load')`) to ensure anchors are present
- No background crawling — respects manual browsing flow.

---

## ❗ Notes:

- This extension intentionally does **not include CSV export** — to promote **manual analysis and understanding**.
- If you want to scrape Google results or competitor pages, you can use any other scraping tool like **"Scraper" extension**, "Instant Data Scraper", etc.

---

## 🔽 Download ZIP:

[Click here to download the latest working ZIP](https://github.com/amal-alexander/seo-competitor-anchor-checker/archive/refs/heads/main.zip)

---

## 🛠️ How I Built It:

- Wrote the extension to inject a **content script only after tab load** using **`chrome.scripting.executeScript()`**.
- Content script waits for the **document ready state** before scanning all `<a>` tags.
- Simple popup to accept **keywords and competitor URLs**.
- Removed CSV Export intentionally to encourage manual inspection.
- Clean MV3 structure with background Service Worker.

---

## 🤝 Connect / Feedback:

Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/amal-alexander-305780131/) or raise an issue in this repo for feature requests.

---

## ✅ Future Improvements (if needed):

- Auto CSV Export (optional)
- Rank checker
- Report generator
- SERP snapshot exporter

---

#SEO #ChromeExtension #CompetitorAnalysis #OpenSource #DigitalMarketing #SEOTool
