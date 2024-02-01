const express = require("express");
const {handleGenerateNewShortUrl, handleNewShortUrlVisit, handleGetAnalytics} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortUrl);
router.get("/:shortId", handleNewShortUrlVisit);
router.get("/analytics/:shortId", handleGetAnalytics)

module.exports = router;