import { validationResult } from "express-validator/check";
import { Category } from "../../database/models";

class CategoryController {
  static async index(req, res) {
    const categories = await Category.findAll();
    res.json(categories);
  }

  static async detail(req, res) {
    const id = req.params.id;
    const category = await Category.findOne({
      where: {
        id: id
      }
    });

    if (!category) {
      return res.status(404).json({ errors: "Category not found" });
    }

    res.json(category);
  }

  static async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;
    try {
      const category = await Category.create({
        name: name,
        description: description
      });

      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  static async update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    try {
      const id = req.params.id;
      let category = await Category.findOne({
        where: {
          id: id
        }
      });

      if (!category) {
        return res.status(404).json({ errors: "Category not found" });
      }

      await Category.update(
        {
          name: name,
          description: description
        },
        {
          where: {
            id: id
          }
        }
      );

      category = await Category.findOne({
        where: {
          id: id
        }
      });

      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  static async delete(req, res) {
    const id = req.params.id;
    let category = await Category.findOne({
      where: {
        id: id
      }
    });

    if (!category) {
      return res.status(404).json({ errors: "Category not found" });
    }

    try {
      Category.destroy({
        where: {
          id: id
        }
      });

      res.json({ msg: "Category removed" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
}

export default CategoryController;
