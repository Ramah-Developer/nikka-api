const axios = require("axios");
const allowedApiKeys = require("../../declaration/arrayKey.jsx"); // Adjust the path to your allowed API keys

const cache = {};

// This function will serve as your API endpoint
module.exports = async (req, res) => {
  // Set trust proxy for Express-like behavior
  if (req.headers['x-forwarded-for']) {
    req.ip = req.headers['x-forwarded-for'].split(',')[0]; // Get the first IP from the X-Forwarded-For header
  }

  const url = req.query.url; // The website URL to scrape
  const apiKey = req.query.apiKey; // The API key for authorization

  // Input validation
  if (!url) {
    return res.status(400).json({ error: "Please provide a URL" });
  }

  if (!apiKey) {
    return res.status(403).json({ error: "API key is missing" });
  }

  if (!allowedApiKeys.includes(apiKey)) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  // Check if the result is cached
  if (cache[url]) {
    return res.status(200).json(cache[url]);
  }

  // Encode URL to ensure it's in a valid format for the target API
  const encodedUrl = encodeURIComponent(url);
  const apiUrl = `https://itzpire.com/tools/about-website?url=${encodedUrl}`;

  try {
    console.log(`Requesting URL: ${apiUrl}`);
    const response = await axios.get(apiUrl, { timeout: 10000 }); // 10 seconds timeout

    // Check if the request was successful
    if (response.data.status === "success") {
      const data = response.data.data;
      const result = {
        title: data.title || "No title available",
        description: data.description || "No description available",
        favicon: data.favicon || "No favicon available",
        isCloudflare: data.is_cloudflare,
        summary: data.summary || "No summary available"
      };

      // Cache the result
      cache[url] = result;

      // Send the extracted data back as JSON
      return res.status(200).json(result);
    } else {
      return res.status(500).json({ error: "Failed to scrape website data" });
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return res.status(500).json({ error: "An error occurred while processing your request" });
  }
};
