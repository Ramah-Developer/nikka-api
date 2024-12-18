/*const axios = require("axios");
const allowedApiKeys = require("../../declaration/arrayKey.jsx");

module.exports = async (req, res) => {
  const url = req.query.url;
  const apiKey = req.query.apiKey;

  if (!url) {
    return res.status(400).json({ error: "Provide a URL" });
  }

  if (!apiKey) {
    return res.status(403).json({ error: "Input parameter 'apiKey'!" });
  }

  if (!allowedApiKeys.includes(apiKey)) {
    return res.status(403).json({ error: "API key invalid or not found" });
  }

  const screenshotUrl = `https://ssweb-livid.vercel.app/ss?url=${encodeURIComponent(url)}`;

  try {
    console.log("Fetching screenshot from:", screenshotUrl);
    console.time("ImageFetch");

    const response = await axios.get(screenshotUrl, { responseType: "arraybuffer", timeout: 10000 });

    console.timeEnd("ImageFetch");

    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    res.status(200).json({
      message: "Screenshot captured successfully",
      image: `data:image/png;base64,${base64Image}`
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "Error taking screenshot",
      details: error.message


      *

const axios = require("axios");
const allowedApiKeys = require("../../declaration/arrayKey.jsx");

module.exports = async (req, res) => {
  const url = req.query.url;
  const apiKey = req.query.apiKey;

  if (!url) {
    return res.status(400).json({ error: "Provide a URL" });
  }

  if (!apiKey) {
    return res.status(403).json({ error: "Input parameter 'apiKey'!" });
  }

  if (!allowedApiKeys.includes(apiKey)) {
    return res.status(403).json({ error: "API key invalid or not found" });
  }

  const screenshotUrl = `https://ssweb-livid.vercel.app/ss?url=${encodeURIComponent(url)}`;

  try {
    const response = await axios({
      method: "get",
      url: screenshotUrl,
      responseType: "stream", // Expect the response as a stream
    });

    res.setHeader("Content-Type", "image/png"); // Set the correct content type
    response.data.pipe(res); // Pipe the stream directly to the client
  } catch (error) {
    console.error("Stream Error:", error.message);
    res.status(500).json({
      error: "Error streaming screenshot",
      details: error.message,
    });
  }
};
    });
  }
};
*/

const axios = require("axios");
const allowedApiKeys = require("../../declaration/arrayKey.jsx");

module.exports = async (req, res) => {
  const url = req.query.url;
  const apiKey = req.query.apiKey;

  if (!url) {
    return res.status(400).json({ error: "Provide a URL" });
  }

  if (!apiKey) {
    return res.status(403).json({ error: "Input parameter 'apiKey'!" });
  }

  if (!allowedApiKeys.includes(apiKey)) {
    return res.status(403).json({ error: "API key invalid or not found" });
  }

  const screenshotUrl = `https://ssweb-livid.vercel.app/ss?url=${encodeURIComponent(url)}`;

  try {
    const response = await axios({
      method: "get",
      url: screenshotUrl,
      responseType: "stream",
    });

    // Set the appropriate headers for the response
    res.setHeader("Content-Type", "image/png");

    // Listen to the 'error' event to handle any stream issues
    response.data.on("error", (streamError) => {
      console.error("Stream error:", streamError.message);
      res.status(500).json({
        error: "Error streaming screenshot",
        details: streamError.message,
      });
    });

    // Pipe the stream directly to the response
    response.data.pipe(res);
  } catch (error) {
    console.error("Stream Request Error:", error.message);
    res.status(500).json({
      error: "Error fetching or streaming the screenshot",
      details: error.message,
    });
  }
};
