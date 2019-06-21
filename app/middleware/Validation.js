import { check } from "express-validator/check";

export const User = {
  insert: [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required")
      .not()
      .isEmpty()
  ],
  auth: [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required")
      .not()
      .isEmpty()
  ]
};

export const Category = {
  insert: [
    check("name", "Name is required")
      .not()
      .isEmpty()
  ]
};

export const TouristAttraction = {
  insert: [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("address", "Address is required")
      .not()
      .isEmpty(),
    check("shortDescription", "Short description is required")
      .not()
      .isEmpty(),
    check("description", "Description is required")
      .not()
      .isEmpty(),
    check("latitude", "Latitude is required")
      .not()
      .isEmpty(),
    check("longitude", "Longitude is required")
      .not()
      .isEmpty()
  ]
};

export const TouristGallery = {
  insert: [
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("touristAttractionId", "Tourist Attraction is required")
      .not()
      .isEmpty()
  ]
};
