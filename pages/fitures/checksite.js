const axios = require("axios")
const allowedApiKeys = require("../../declaration/arrayKey.jsx")

module.exports = async (req, res) => {

  const message = req.query.message
  const apiKey = req.query.apiKey

  if (!message) {
    return res.status(400).json({
      error: "provide url"
    })
  }

  if (!apiKey) {
    return res.status(403).json({
      error: "Input Parameter Apikey!"
    })
  } else if (!allowedApiKeys.includes(apiKey)) {
    return res.status(403).json({
      error: "apikey not found"
    })
  }

  const url = `https://api.agatz.xyz/api/google?message=${message}`

  try {
    const response = await axios.get(url)
    const data = response.data.summary
    res.status(200).json({
      data
    })
  } catch (error) {
    res.status(500).json({
      error: "err, fedk up"
    })
  }
}

