const Listing = require("../models/listing.js");
const axios = require('axios');

// Helper function for geocoding
const geocodeLocation = async (location) => {
  if (!process.env.MAP_TOKEN) {
    throw new Error("OpenCage API key is missing");
  }

  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${process.env.MAP_TOKEN}`
    );

    if (!response.data.results || response.data.results.length === 0) {
      throw new Error("No results found for this location");
    }

    return response.data.results[0].geometry;
  } catch (error) {
    console.error("Geocoding error:", error);
    throw new Error("Location service unavailable. Please try again later.");
  }
};

module.exports = {
  // Index - List all listings
  index: async (req, res) => {
    try {
      const allListings = await Listing.find();
      res.render("listings/index", { allListings });
    } catch (error) {
      console.error("Error fetching listings:", error);
      req.flash("error", "Failed to load listings");
      res.redirect("/");
    }
  },

  // New - Show form to create new listing
  newListing: (req, res) => {
    res.render("listings/new");
  },

  // Show - Display specific listing
  showListing: async (req, res) => {
    try {
      const { id } = req.params;
      const list = await Listing.findById(id)
        .populate({
          path: "reviews",
          populate: { path: "author" }
        })
        .populate("owner");

      if (!list) {
        req.flash("error", "Listing Does Not Exist!");
        return res.redirect("/listings");
      }

      res.render("listings/show", { list }); // Keep as 'list'
    } catch (error) {
      console.error("Error showing listing:", error);
      req.flash("error", "Failed to load listing");
      res.redirect("/listings");
    }
  },

  // Create - Save new listing
  postNewListing: async (req, res) => {
    try {
      // Verify authentication
      if (!req.user) {
        req.flash("error", "You must be logged in to create a listing");
        return res.redirect("/login");
      }

      // Validate required fields
      if (!req.body.listing || !req.body.listing.location) {
        req.flash("error", "Location is required");
        return res.redirect("/listings/new");
      }

      // Geocode location
      const geometry = await geocodeLocation(req.body.listing.location);
      const coordinates = [geometry.lng, geometry.lat];

      // Create new listing
      const newListing = new Listing({
        ...req.body.listing,
        owner: req.user._id,
        image: {
          filename: req.file.filename,
          url: req.file.path
        },
        geometry: {
          type: "Point",
          coordinates: coordinates
        }
      });

      await newListing.save();
      
      req.flash("success", "New Listing Created Successfully!");
      res.redirect("/listings");
    } catch (error) {
      console.error("Error creating listing:", error);
      req.flash("error", error.message || "Failed to create listing");
      res.redirect("/listings/new");
    }
  },

  // Edit - Show form to edit listing
  getEditForm: async (req, res) => {
    try {
      const { id } = req.params;
      const listing = await Listing.findById(id);

      if (!listing) {
        req.flash("error", "Listing Does Not Exist!");
        return res.redirect("/listings");
      }

      // Create thumbnail URL for image if it exists
      if (listing.image && listing.image.url) {
        listing.image.thumbnail = listing.image.url.replace("/upload", "/upload/h_150,w_75");
      }

      res.render("listings/edit", { listing });
    } catch (error) {
      console.error("Error loading edit form:", error);
      req.flash("error", "Failed to load edit form");
      res.redirect("/listings");
    }
  },

  // Update - Save edited listing
  putEditForm: async (req, res) => {
    try {
      const { id } = req.params;
      const listingData = { ...req.body.listing };

      // Handle image update if new file was uploaded
      if (req.file) {
        listingData.image = {
          filename: req.file.filename,
          url: req.file.path
        };
      }

      await Listing.findByIdAndUpdate(id, listingData);
      
      req.flash("success", "Listing Updated!");
      res.redirect(`/listings/${id}`);
    } catch (error) {
      console.error("Error updating listing:", error);
      req.flash("error", "Failed to update listing");
      res.redirect(`/listings/${id}/edit`);
    }
  },

  // Delete - Remove listing
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      await Listing.findByIdAndDelete(id);
      
      req.flash("success", "Listing Deleted!");
      res.redirect("/listings");
    } catch (error) {
      console.error("Error deleting listing:", error);
      req.flash("error", "Failed to delete listing");
      res.redirect("/listings");
    }
  }
};