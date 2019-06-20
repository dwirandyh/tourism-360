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
