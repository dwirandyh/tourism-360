"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var paginate = exports.paginate = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(model, options) {
    var page, pageSize, totalPage, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = options.page, pageSize = options.pageSize;


            delete options.page;
            delete options.pageSize;

            _context.next = 5;
            return model.count(options);

          case 5:
            totalPage = _context.sent;


            options.offset = (page - 1) * pageSize;
            options.limit = pageSize;

            _context.next = 10;
            return model.findAll(options);

          case 10:
            data = _context.sent;
            return _context.abrupt("return", {
              page: {
                page: page,
                pageSize: pageSize,
                total: totalPage
              },
              data: data
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function paginate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var page = exports.page = function page(req) {
  var page = req.query.page;
  if (!page) {
    return 1;
  }
  return page;
};

var pageSize = exports.pageSize = 20;
//# sourceMappingURL=Paginate.js.map