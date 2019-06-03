import express from "express";
import { Todo, TodoItem } from "../../database/models";

class WelcomeController {
  static async index(req, res) {
    return res.json({ msg: "Welcome" });
  }
}

export default WelcomeController;
