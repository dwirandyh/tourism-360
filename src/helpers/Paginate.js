export const paginate = async (model, options) => {
  const { page, pageSize } = options;

  delete options.page;
  delete options.pageSize;

  const totalPage = await model.count(options);

  options.offset = (page - 1) * pageSize;
  options.limit = pageSize;

  const data = await model.findAll(options);

  return {
    page: {
      page,
      pageSize,
      total: totalPage
    },
    data
  };
};

export const page = req => {
  const page = req.query.page;
  if (!page) {
    return 1;
  }
  return page;
};

export const pageSize = 20;
