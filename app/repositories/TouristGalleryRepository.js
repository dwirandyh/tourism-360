import { TouristGallery } from "../../database/models";
import { page, pageSize } from "../helpers/Paginate";

class TouristGalleryRepository {
  static async getData(req) {
    let options = {
      page: page(req),
      pageSize: pageSize
    };

    return await TouristGallery.paginate(options);
  }

  static async search(req, options) {
    options = {
      ...options,
      page: page(req),
      pageSize: pageSize
    };

    return await TouristGallery.paginate(options);
  }

  static async detail(id) {
    return await TouristGallery.findOne({
      where: {
        id: id
      }
    });
  }

  static async create(options) {
    return await TouristGallery.create(options);
  }

  static async update(data, options) {
    return await TouristGallery.update(data, options);
  }

  static async destroy(options) {
    return await TouristGallery.destroy(options);
  }
}

export default TouristGalleryRepository;
