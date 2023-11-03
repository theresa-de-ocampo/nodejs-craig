// Express Application
import express from "express";
import { fileURLToPath } from "url";
import { dirname, sep } from "path";
import compression from "compression";
import { helloRouter } from "./routes/hello.js";
import { goodbyeRouter } from "./routes/goodbye.js";

// Configuration
const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;
const configuration = {
  port: process.env.PORT || 3000,
  dir: {
    root: __dirname,
    public: __dirname + "public" + sep,
    views: __dirname + "views" + sep
  }
};

// Express Inititation
const app = express();

// Do not identify express
app.disable("x-powered-by");

// Use EJS Templates
app.set("view engine", "ejs");
app.set("views", configuration.dir.views);

// HTTP Compression
app.use(compression());

app.use("/hello", helloRouter);
app.use("/goodbye", goodbyeRouter);

// Serve Static Assets
app.use(express.static(configuration.dir.public));

// Handle 404 Errors
app.use((req, res) => {
  res.render("message", { title: "Not Found", location: req.originalUrl });
});

// Start Server
app.listen(configuration.port, () => {
  console.log(
    `Example app listening at http://localhost:${configuration.port}`
  );
});

// Export Defaults
export { configuration, app };
