import { validationResult } from "express-validator/check";
import { Sequelize } from "../../database/models";
import TouristGalleryRepository from "../repositories/TouristGalleryRepository";
import sharp from "sharp";
import fs from "fs";

class TouristGalleryController {
  static async index(req, res) {
    let galleries = [];
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

      galleries = await TouristGalleryRepository.search(req, options);
    } else {
      galleries = await TouristGalleryRepository.getData(req);
    }
    res.json(galleries);
  }

  static async detail(req, res) {
    const id = req.params.id;
    const gallery = await TouristGalleryRepository.detail(id);

    if (!gallery) {
      return res.status(404).json({ errors: "gallery not found" });
    }

    res.json(gallery);
  }

  static async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let thumbnail = "";
    if (req.file) {
      sharp(req.file.path)
        .resize({
          height: 500
        })
        .toBuffer((err, buffer) => {
          fs.writeFile(`./uploads/${req.file.filename}`, buffer, e => {});
        });

      thumbnail = req.file.filename;
    }

    const { title, touristAttractionId } = req.body;
    try {
      const gallery = await TouristGalleryRepository.create({
        title: title,
        touristAttractionId: touristAttractionId,
        thumbnail: thumbnail
      });
      res.json(gallery);
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

    const { title, touristAttractionId } = req.body;

    let data = {
      title: title,
      touristAttractionId: touristAttractionId
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
      let gallery = await TouristGalleryRepository.detail(id);

      if (!gallery) {
        return res.status(404).json({ errors: "gallery not found" });
      }

      await TouristGalleryRepository.update(data, {
        where: {
          id: id
        }
      });

      gallery = await TouristGalleryRepository.detail(id);
      res.json(gallery);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }

  static async delete(req, res) {
    const id = req.params.id;
    let gallery = await TouristGalleryRepository.detail(id);

    if (!gallery) {
      return res.status(404).json({ errors: "gallery not found" });
    }

    try {
      await TouristGalleryRepository.destroy({
        where: {
          id: id
        }
      });

      res.json({ msg: "Gallery removed" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
}

export default TouristGalleryController;
