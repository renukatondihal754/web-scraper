const express = require("express");
const cors = require("cors");
const { scrapeWebsite } = require("./scraper");
const fs = require("fs");
const path = require("path"); // ✅ Required for cross-platform-safe paths

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/scrape", async (req, res) => {
  const { urls } = req.body;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: "Invalid input. Provide an array of URLs." });
  }

  const result = [];

  for (const url of urls) {
    const data = await scrapeWebsite(url);
    result.push(data);
  }

  // ✅ Create output folder if not exists
  const outputDir = path.join(__dirname, "output");
  const outputPath = path.join(outputDir, "output.json");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  res.json({ success: true, data: result });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
