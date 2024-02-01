const Url = require("../models/url");

async function generateShortId() {
  const randomVal=  Math.random().toString(36).substring(2, 8);
  return randomVal;
} 

async function handleGenerateNewShortUrl(req, res) {
  const sId = await generateShortId();
  const body = req.body;
  if(!body.url) return res.status(400).json({msg: "URL is required"});
  await Url.create({
    shortId: sId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.json({id: sId});
}

async function handleNewShortUrlVisit(req, res) {
  const {shortId} = req.params;
  try {
    const url = await Url.findOne({shortId});

    if(!url) {
      return res.status(404).json({error: "URL not found"});
    }

    url.visitHistory.push({timestamp: new Date()});
    await url.save();

    const final = `https://${url.redirectUrl}`;
    return res.redirect(final);

  } catch(error) {
    console.error(error);
    return res.status(500).json({error: "Internal server error"});
  }
}

async function handleGetAnalytics(req, res) {
  const {shortId} = req.params;
  try{
    const result = await Url.findOne({shortId});
    return res.status(200).json({totalClicks: result.visitHistory.length, analytics: result.visitHistory});
  } catch(error) {
    console.error(error);
    res.status(500).json({error: "Internal server errror"});
  }
}

module.exports = {
  handleGenerateNewShortUrl,
  handleNewShortUrlVisit,
  handleGetAnalytics,
}