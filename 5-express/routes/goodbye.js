import { Router } from "express";
import { goodbye } from "../lib/locale.js";
import { capitalize } from "../lib/string.js";

export const goodbyeRouter = Router();

goodbyeRouter.get("/:name", (req, res) => {
  res.render("message", {
    title: `${goodbye.en} ${capitalize(req.params.name)}!`,
    location: req.originalUrl
  });
});

goodbyeRouter.get("/:lang/:name", (req, res) => {
  res.render("message", {
    title: `${goodbye[req.params.lang]} ${capitalize(req.params.name)}`,
    location: req.originalUrl
  });
});
