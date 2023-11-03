import compression from "compression";
import express from "express";
import formidable from "formidable";
import { dirname, sep } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;
const configuration = {
  port: process.env.PORT || 3000,
  dir: {
    root: __dirname,
    views: __dirname + "views" + sep,
    public: __dirname + "public" + sep,
    uploads: __dirname + "public" + sep + "uploads" + sep
  }
};

const app = express();

app.disable("x-powered-by");
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(configuration.dir.public));

app.all("/", (req, res, next) => {
  if (req.method === "GET") {
    console.log(req.query);
    res.statusCode = 200;
    res.send(req.query);
  } else if (req.method === "POST") {
    const form = formidable({
      uploadDir: configuration.dir.uploads,
      keepExtensions: true
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      let profilePicture = null;
      // console.log(fields);

      if (files && files.profilePicture[0]) {
        let file = files.profilePicture[0];
        profilePicture = {
          name: file.originalFilename,
          type: file.mimetype,
          size: file.size,
          url: file.filepath
        };
      }

      // Parse field value that were converted to arrays by formidable
      Object.keys(fields).forEach((key) => {
        fields[key] = fields[key][0];
      });

      res.statusCode = 200;
      res.send({
        ...fields,
        profilePicture
      });
    });
  } else {
    next();
  }
});

app.listen(configuration.port, () => {
  console.log(`App listening at http://localhost:${configuration.port}`);
});
