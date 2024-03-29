import { validationResult } from "express-validator/check";
import { Sequelize } from "../database/models";
import TouristAttractionRepository from "../repositories/TouristAttractionRepository";
import sharp from "sharp";
import fs from "fs";
import TouristGalleryRepository from "../repositories/TouristGalleryRepository";

class TouristAttractionController {
  /**
   * get all tourist with pagination
   * @param {*} req
   * @param {*} res
   */
  static async index(req, res) {
    let attractions = [];
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

      attractions = await TouristAttractionRepository.search(req, options);
    } else {
      attractions = await TouristAttractionRepository.getData(req);
    }
    res.json(attractions);
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
        longitude,
        thumbnail
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
      const id = req.params.id;
      let tourist = await TouristAttractionRepository.detail(id);

      if (!tourist) {
        return res.status(404).json({ errors: "tourist not found" });
      }

      await TouristAttractionRepository.update(
        {
          name,
          address,
          shortDescription,
          description,
          latitude,
          longitude,
          thumbnail
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

  // Public API

  static async popular(req, res) {
    try {
      const attractions = await TouristAttractionRepository.popular();
      return res.json(attractions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  static async gallery(req, res) {
    try {
      const id = req.params.id;
      const galleries = await TouristGalleryRepository.getAttractionGallery(id);
      return res.json(galleries);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  static async searchAttraction(req, res) {
    const query = req.query.q;
    if (!query) {
      return res.status(404).json({ msg: "Keyword is required" });
    }
    try {
      const Op = Sequelize.Op;
      const options = {
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${query}%`
              }
            },
            {
              shortDescription: {
                [Op.like]: `%${query}%`
              }
            }
          ]
        }
      };

      const attractions = await TouristAttractionRepository.searchAttraction(
        options
      );
      res.json(attractions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
}

export default TouristAttractionController;
