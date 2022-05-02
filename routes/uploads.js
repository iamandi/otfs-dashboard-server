const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Without Auth
    // TODO: With authentication you need to decide on the directory
  },
  limits: function (req, file, cb) {
    cb(null, "25 * 1024 * 1024");
  },
});
const upload = multer({ storage: storage });

// router.get("/", auth, (req, res) => {
router.get("/", async (req, res) => {
  const uploadPage = `
  <html>
    <body>   
      <form id='uploadForm' action="/api/uploads" method="post" enctype="multipart/form-data">
        <input type="file" name="avatar" />
        <input type='submit' value='Upload' />
      </form>
    </body>
  </html>`;
  res.send(uploadPage);
});

router.post(
  "/",
  // auth,
  //[
  // Order of these middleware matters.
  // "upload" should come before other "validate" because we have to handle
  // multi-part form data. Once the upload middleware from multer applied,
  // request.body will be populated and we can validate it. This means
  // if the request is invalid, we'll end up with one or more image files
  // stored in the uploads folder. We'll need to clean up this folder
  // using a separate process.
  // auth,
  //upload.array("images", config.get("maxImageCount")),
  //validateWith(schema),
  //validateCategoryId,
  //imageResize,
  //],
  upload.single("avatar"),
  (req, res) => {
    const listing = {};
    listing.images = [req.file.originalname];
    console.log('listing', listing);

    // store.addListing(listing);

    res.status(201).send(listing);
  }
);

module.exports = router;


/*

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).array("file");

router.get("/", function (req, res) {
  return res.status(200).send("Hello World!");
});

router.post("/", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("(err instanceof multer.MulterError");
      return res.status(500).json(err);
      // A Multer error occurred when uploading.
    } else if (err) {
      console.log("(err  ", err);
      return res.status(500).json(err);
      // An unknown error occurred when uploading.
    }

    return res.status(200).send(req.file);
    // Everything went fine.
  });
});

*/