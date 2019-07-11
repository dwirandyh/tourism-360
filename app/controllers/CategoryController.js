import { validationResult } from "express-validator/check";
import { Sequelize } from "../../database/models";
import CategoryRepository from "../repositories/CategoryRepository";
import sharp from "sharp";
import fs from "fs";

class CategoryController {
  /**
   * get all category with pagination
   * @param {*} req
   * @param {*} res
   */
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

  static async all(req, res) {
    const categories = await CategoryRepository.getAllCategories();
    res.json(categories);
  }

  /**
   * get detail category by id
   * @param {*} req
   * @param {*} res
   */
  static async detail(req, res) {
    const id = req.params.id;
    const category = await CategoryRepository.detail(id);

    if (!category) {
      return res.status(404).json({ errors: "Category not found" });
    }

    res.json(category);
  }

  /**
   * insert new category
   * @param {*} req
   * @param {*} res
   */
  static async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let thumbnail = "";
    if (req.file) {
      // Resize image
      sharp(req.file.path)
        .resize({
          height: 200
        })
        .toBuffer((err, buffer) => {
          fs.writeFile(`./uploads/${req.file.filename}`, buffer, e => {});
        });

      thumbnail = req.file.filename;
    }

    const { name, description } = req.body;
    try {
      const category = await CategoryRepository.create({
        name: name,
        description: description,
        thumbnail: thumbnail
      });

      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  /**
   * Update category by id
   * @param {*} req
   * @param {*} res
   */
  static async update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    let data = {
      name: name,
      description: description
    };

    if (req.file) {
      sharp(req.file.path)
        .resize({
          height: 500
        })
        .toBuffer((err, buffer) => {
          fs.writeFile(`./uploads/${req.file.filename}`, buffer, e => {});
        });

      data.thumbnail = req.file.filename;
    }

    try {
      const id = req.params.id;
      let category = await CategoryRepository.detail(id);

      if (!category) {
        return res.status(404).json({ errors: "Category not found" });
      }

      await CategoryRepository.update(data, {
        where: {
          id: id
        }
      });

      category = await CategoryRepository.detail(id);

      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  /**
   * Delete category by id
   * @param {*} req
   * @param {*} res
   */
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

  static async getAttraction(req, res) {
    const id = req.params.id;
    let category = await CategoryRepository.detail(id);
    if (!category) {
      return res.status(404).json({ errors: "Category not found" });
    }

    try {
      const attractions = await CategoryRepository.getAttractionById(id);
      return res.json(attractions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
}

export default CategoryController;
