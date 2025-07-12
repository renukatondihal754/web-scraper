const puppeteer = require("puppeteer");

function extractEmails(text) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/gi;
  return text.match(emailRegex) || [];
}

function extractPhoneNumbers(text) {
  const phoneRegex = /(?:\+91[\s-]*)?(?:\d{3,5}[\s-]*){2,3}/g;

  const matches = text.match(phoneRegex) || [];

  // Clean up and validate length
  return matches
    .map(p => p.trim())
    .filter(p => p.replace(/\D/g, "").length >= 10); // at least 10 digits
}

function extractSocialLinks(html){
    const platforms = {
        facebook: [],
        twitter:[],
        instagram:[],
        linkedin:[],
        whatsapp:[],
    };
      const socialRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
        let match;
        while ((match = socialRegex.exec(html))){
            const url = match[1];
            if(url.includes("facebook.com")) platforms.facebook.push(url);
            if(url.includes("twitter.com")) platforms.twitter.push(url)
            if(url.includes("instagram.com")) platforms.instagram.push(url)
            if(url.includes("linkedin.com")) platforms.linkedin.push(url)
            // if(url.includes("wa.me") || url.includes(whatsapp.com)) platforms.whatsapp.push(url) 
         }
        return platforms
}

function extractAddress(text) {
  const addressKeywords = [
    "address",
    "location",
    "visit us at",
    "office at",
    "head office",
    "branch",
  ];

  const lines = text.split("\n").map(l => l.trim());
  const matches = lines.filter(line =>
    addressKeywords.some(keyword => line.toLowerCase().includes(keyword))
  );

  return matches.length > 0 ? matches.slice(0, 2) : ["Not Found"];
}

async function scrapeWebsite(url) {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

    const pageText = await page.evaluate(() => document.body.innerText);
    const pageHtml = await page.content();

    const emails = [...new Set([...extractEmails(pageText), ...extractEmails(pageHtml)])];
    const phones = [...new Set(extractPhoneNumbers(pageText))];
    const socials = extractSocialLinks(pageHtml);
    const address = extractAddress(pageText);


    const title = await page.title();

    return {
      name: title || "N/A",
      website: url,
      contact: {
        emails: emails.length ? emails : ["Not Found"],
        phones: phones.length ? phones : ["Not Found"],
        address,
        socialMedia : socials
      },
    };
  } catch (error) {
    console.error(`❌ Error scraping ${url}:`, error.message);
    return {
      name: "Error",
      website: url,
      contact: {
        emails: ["Error fetching"],
        phones: ["Error fetching"],
        address: ["Error fetching"],
        socialMedia: {},


      },
    };
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { scrapeWebsite };
