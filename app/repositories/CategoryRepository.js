import { Category } from "../../database/models";
import { page, pageSize } from "../helpers/Paginate";

class CategoryRepository {
  static async getAllCategories() {
    return await Category.findAll();
  }

  static async getData(req) {
    let options = {
      page: page(req),
      pageSize: pageSize
    };
    return await Category.paginate(options);
  }

  static async search(req, options) {
    options = {
      ...options,
      page: page(req),
      pageSize: pageSize
    };
    return await Category.paginate(options);
  }

  static async detail(id) {
    return await Category.findOne({
      where: {
        id: id
      }
    });
  }

  static async create(options) {
    return await Category.create(options);
  }

  static async update(data, options) {
    return await Category.update(data, options);
  }

  static async destroy(options) {
    return await Category.destroy(options);
  }
}
export default CategoryRepository;
