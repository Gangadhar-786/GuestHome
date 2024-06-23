const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfiguration.js");
const upload = multer({ storage });

router.route("/").get(wrapAsync(listingController.index)).post(
  isLoggedIn,

  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing)
);

//Index Route
router.get("/", wrapAsync(listingController.index));

// New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route(READ)
router.get("/:id", wrapAsync(listingController.showListing));

// //Create Route
// router.post(
//   "/",
//   // isLoggedIn,
//   // validateListing,
//   // wrapAsync(listingController.createListing)
// );

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
);

//Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)
);

module.exports = router;
