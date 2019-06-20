import { validationResult } from "express-validator/check";
import { Sequelize } from "../../database/models";
import CategoryRepository from "../repositories/CategoryRepository";

class CategoryController {
  static async index(req, res) {
    let categories = [];
    const query = req.query.name;
    if (query) {
      const Op = Sequelize.Op;
      const options = {
        where: {
          name: {
            [Op.like]: `%${query}%`
          }
        }
      };

      categories = await CategoryRepository.search(req, options);
    } else {
      categories = await CategoryRepository.getData(req);
    }
    res.json(categories);
  }

  static async detail(req, res) {
    const id = req.params.id;
    const category = CategoryRepository.getDetail(id);

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
      const category = await CategoryRepository.create({
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
      let category = await CategoryRepository.detail(id);

      if (!category) {
        return res.status(404).json({ errors: "Category not found" });
      }

      await CategoryRepository.update(
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

      category = await CategoryRepository.detail(id);

      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  static async delete(req, res) {
    const id = req.params.id;
    let category = await CategoryRepository.detail(id);

    if (!category) {
      return res.status(404).json({ errors: "Category not found" });
    }

    try {
      await CategoryRepository.destroy({
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
