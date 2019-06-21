import { validationResult } from "express-validator/check";
import { Sequelize } from "../../database/models";
import TouristAttractionRepository from "../repositories/TouristAttractionRepository";
import sharp from "sharp";
import fs from "fs";

class TouristAttractionController {
  /**
   * get all tourist with pagination
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

      categories = await TouristAttractionRepository.search(req, options);
    } else {
      categories = await TouristAttractionRepository.getData(req);
    }
    res.json(categories);
  }

  /**
   * get detail tourist by id
   * @param {*} req
   * @param {*} res
   */
  static async detail(req, res) {
    const id = req.params.id;
    const tourist = await TouristAttractionRepository.detail(id);

    if (!tourist) {
      return res.status(404).json({ errors: "tourist not found" });
    }

    res.json(tourist);
  }

  /**
   * insert new tourist
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
          height: 500
        })
        .toBuffer((err, buffer) => {
          fs.writeFile(`./uploads/${req.file.filename}`, buffer, e => {});
        });

      thumbnail = req.file.filename;
    }

    const {
      name,
      address,
      shortDescription,
      description,
      latitude,
      longitude
    } = req.body;
    try {
      const tourist = await TouristAttractionRepository.create({
        name,
        address,
        shortDescription,
        description,
        latitude,
        longitude
      });

      res.json(tourist);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  /**
   * Update tourist by id
   * @param {*} req
   * @param {*} res
   */
  static async update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    try {
      const id = req.params.id;
      let tourist = await TouristAttractionRepository.detail(id);

      if (!tourist) {
        return res.status(404).json({ errors: "tourist not found" });
      }

      await TouristAttractionRepository.update(
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

      tourist = await TouristAttractionRepository.detail(id);

      res.json(tourist);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  /**
   * Delete tourist by id
   * @param {*} req
   * @param {*} res
   */
  static async delete(req, res) {
    const id = req.params.id;
    let tourist = await TouristAttractionRepository.detail(id);

    if (!tourist) {
      return res.status(404).json({ errors: "tourist not found" });
    }

    try {
      await TouristAttractionRepository.destroy({
        where: {
          id: id
        }
      });

      res.json({ msg: "Tourist attraction removed" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
}

export default TouristAttractionController;
