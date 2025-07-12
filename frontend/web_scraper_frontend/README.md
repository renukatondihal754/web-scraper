# 🌐 Web Scraper Tool – Company Info Extractor

This is a full-stack web scraping tool that accepts a search query or set of seed URLs and extracts detailed information about companies. Built using **React (frontend)**, **Node.js + Puppeteer (backend)**, and **TailwindCSS** for styling.

---

## 🚀 Features Implemented

- Accept multiple URLs from the user (via textarea)
- Scrape each page using Puppeteer and extract:
  - ✅ Company Name (page title)
  - ✅ Website URL
  - ✅ Emails (from visible text + mailto links)
  - ✅ Phone numbers (with +91, space, dash formats)
  - ✅ Social media links (LinkedIn, WhatsApp, Instagram, Facebook, Twitter)
  - ✅ Physical address/location (detected from page text)
- Display results in the frontend UI
- Save results in a structured JSON file (`output/output.json`)
- Graceful error handling for failed URLs

---

## 📊 Data Extraction Levels

| Level       | Implemented | Details |
|-------------|-------------|---------|
| **Basic**   | ✅ Yes       | Name, website, emails |
| **Medium**  | ✅ Yes       | Phone, address, social profiles |


---

## ⚙️ Setup & Run

1. Clone the repository:

   `git clone https://github.com/YOUR_USERNAME/web-scraper.git && cd web-scraper`

2. Backend setup:

   - Navigate to the `backend` folder
   - Run `npm install` to install dependencies
   - Create the `output` folder if not present: `mkdir -p output && echo "[]" > output/output.json`
   - Start the backend server: `node index.js`

3. Frontend setup:

   - Go to `frontend/web_scraper_frontend`
   - Run `npm install` to install dependencies
   - Start the React app: `npm start`
   - Visit `http://localhost:3000` in your browser

---

## 💡 Design Decisions & Assumptions

- Uses Puppeteer to support JavaScript-rendered pages
- Extracts contact data from both raw text and HTML
- Phone/address/social links are extracted using general regex or pattern-based detection
- Assumes each input URL corresponds to one company
- Writes all output to a JSON file for further use

---

## 📤 Output Sample (`output/output.json`)

```json
[
  {
    "name": "Welcome to Rajavruksha – Your Real Estate Partner",
    "website": "https://rajavrukshagroup.in/",
    "contact": {
      "emails": ["enquiry@rajavrukshagroup.in"],
      "phones": ["+91 8549 955 955"],
      "address": ["JP Nagar Bangalore India"],
      "socialMedia": {
        "facebook": ["https://facebook.com/rajavruksha"],
        "whatsapp": ["https://wa.me/918549955955"],
        "linkedin": []
      }
    }
  }
]
