const { Router, request } = require("express");
const { default: ShortUniqueId } = require("short-unique-id");
const validUrl = require("valid-url");
require("dotenv").config();
const { UrlModel } = require("../Models/UrlModel");
const BaseUrl = process.env.BaseUrl;
const UrlRouter = Router();
const uid = new ShortUniqueId({ length: 10 });
UrlRouter.post("/shorten", async (req, res) => {
    const { longUrl, customName } = req.body;
    // console.log(longUrl, BaseUrl);
    if (!validUrl.isUri(BaseUrl)) {
        return res.status(400).send({ message: "Invalid Base URL" });
    }

    if (validUrl.isUri(longUrl)) {
        try {
            const url = await UrlModel.findOne({ longUrl });
            if (url) {
                return res
                    .status(201)
                    .send({ message: "Already Exists...", data: url.shortUrl });
            } else {
                if (customName) {
                    const shortUrl = `${BaseUrl}/${customName}`;
                    const customUrl = await UrlModel.findOne({ shortUrl });
                    if (customUrl) {
                        return res.status(403).send({
                            message: "Url Already Exist...",
                        });
                    } else {
                        const newUrl = new UrlModel({
                            urlCode: customName,
                            longUrl,
                            shortUrl,
                            date: new Date(),
                        });

                        newUrl.save((err, success) => {
                            if (err) {
                                return res.status(500).send({
                                    message: "Internal Server Error",
                                });
                            } else {
                                return res.status(201).send({
                                    message:
                                        "new short url generated successfully",
                                    data: shortUrl,
                                });
                            }
                        });
                    }
                } else {
                    const urlCode = uid();
                    const shortUrl = `${BaseUrl}/${urlCode}`;

                    const newUrl = new UrlModel({
                        urlCode,
                        longUrl,
                        shortUrl,
                        date: new Date(),
                    });

                    newUrl.save((err, success) => {
                        if (err) {
                            return res.status(500).send({
                                message: "Internal Server Error",
                            });
                        } else {
                            return res.status(201).send({
                                message: "new short url generated successfully",
                                data: shortUrl,
                            });
                        }
                    });
                }
            }
        } catch {
            return res.status(500).send({ message: "Internal Server Error" });
        }
    } else {
        return res.status(400).send({ message: "Invalid Long URL" });
    }
});
UrlRouter.get("/:code", async (req, res) => {
    const { code } = req.params;

    try {
        const url = await UrlModel.findOne({ urlCode: code });
        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).send({ message: "Url not found" });
        }
    } catch {
        return res.status(500).send({ message: "Internal Server Error" });
    }
});
module.exports = { UrlRouter };
