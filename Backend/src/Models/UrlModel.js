const { Schema, model } = require("mongoose");

const UrlSchema = new Schema({
    longUrl: String,
    shortUrl: String,
    urlCode: String,
    date: { type: String, default: Date.now },
});

const UrlModel = model("url", UrlSchema);

module.exports = { UrlModel };
