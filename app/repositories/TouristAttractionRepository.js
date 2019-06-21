import { TouristAttractions } from "../../database/models";
import { page, pageSize } from "../helpers/Paginate";

class TouristAttractionRepository {
  static async getData(req) {
    let options = {
      page: page(req),
      pageSize: pageSize
    };
    return await TouristAttractions.paginate(options);
  }

  static async search(req, options) {
    options = {
      ...options,
      page: page(req),
      pageSize: pageSize
    };
    return await TouristAttractions.paginate(options);
  }

  static async detail(id) {
    return await TouristAttractions.findOne({
      where: {
        id: id
      }
    });
  }

  static async create(options) {
    return await TouristAttractions.create(options);
  }

  static async update(data, options) {
    return await TouristAttractions.update(data, options);
  }

  static async destroy(options) {
    return await TouristAttractions.destroy(options);
  }
}
export default TouristAttractionRepository;
