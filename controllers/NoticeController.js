//引入数据模型对象，这个对象中就包含了数据库的所有操作
const NoticesModel = require('../models/NoticesModel');
const Utils = require('../utils/Utils');
const ResponseEntity = require("../utils/ResponseEntity")
class NoticesController {
  async findNotices(req, res, next) {
    try {
      let data = await NoticesModel.find(); //
      const obj = {
        data,
        msg: "查询成功"
      }
      const result = ResponseEntity.success(obj)
      res.send(result);
    } catch (error) {
      const obj = {
        msg: error.message
      }
      const result = ResponseEntity.error(obj)
      res.send(result);
    }
  }
}
module.exports = new NoticesController();
