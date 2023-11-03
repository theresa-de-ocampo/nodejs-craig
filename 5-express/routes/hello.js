import { Router } from "express";
import { hello } from "../lib/locale.js";
import { capitalize } from "../lib/string.js";

export const helloRouter = Router();

// req.url = /fr/teriz
// req.baseUrl = /hello
// req.originalUrl = /hello/fr/teriz, that is, a combination of req.baseUrl and req.url

helloRouter.get("/:name", (req, res, next) => {
  res.render("message", {
    title: `${hello.en} ${capitalize(req.params.name)}!`,
    location: req.originalUrl
  });
});

helloRouter.get("/:lang/:name", (req, res, next) => {
  console.log(req.originalUrl);
  res.render("message", {
    title: `${hello[req.params.lang]} ${capitalize(req.params.name)}!`,
    location: req.originalUrl
  });
});
