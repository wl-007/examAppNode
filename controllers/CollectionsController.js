//引入数据模型对象，这个对象中就包含了数据库的所有操作
const CollectionsModel = require('../models/CollectionsModel');
const Utils = require('../utils/Utils');
const ResponseEntity = require("../utils/ResponseEntity")
class CollectionsController {
    // 增加收藏
    async addCollection(req, res, next) {
        try {
            const { exerciseId } = req.body;
            const bearerToken = req.get('Authorization');
            const studentId = Utils.getCurrentId(bearerToken);
            if (exerciseId) {
                let data = await CollectionsModel.findOne({ studentId, exerciseId }); //
                if (data) {
                    const obj = {
                        msg: "该题已存在"
                    }
                    const result = ResponseEntity.error(obj)
                    res.send(result);
                } else {
                    data = await CollectionsModel.create({ studentId, exerciseId }); //
                    const obj = {
                        data,
                        msg: "增加成功"
                    }
                    const result = ResponseEntity.success(obj)
                    res.send(result);
                }

            } else {
                const obj = {
                    msg: "exerciseId 不可为空"
                }
                const result = ResponseEntity.error(obj)
                res.send(result);
            }

        } catch (error) {
            const obj = {
                msg: error.message
            }
            const result = ResponseEntity.error(obj)
            res.send(result);
        }
    }
    // 删除收藏
    async delCollection(req, res, next) {
        try {
            const { exerciseId } = req.body;
            const bearerToken = req.get('Authorization');
            const studentId = Utils.getCurrentId(bearerToken);
            if (exerciseId) {
                let data = await CollectionsModel.findOne({ studentId, exerciseId }); //
                if (data) {
                    const data = await CollectionsModel.deleteOne({ studentId, exerciseId }); //
                    const obj = {
                        data,
                        msg: "删除成功"
                    }
                    const result = ResponseEntity.success(obj)
                    res.send(result);
                } else {
                    const obj = {
                        msg: "未找到目标数据"
                    }
                    const result = ResponseEntity.error(obj)
                    res.send(result);
                }

            } else {
                const obj = {
                    msg: "exerciseId 不可为空"
                }
                const result = ResponseEntity.error(obj)
                res.send(result);
            }

        } catch (error) {
            const obj = {
                msg: error.message
            }
            const result = ResponseEntity.error(obj)
            res.send(result);
        }
    }
    // 返回收藏信息
    async getCollInfo(req, res, next) {
        try {
            const bearerToken = req.get('Authorization');
            const studentId = Utils.getCurrentId(bearerToken);
            let data = await CollectionsModel.find({ studentId }).populate("exerciseId"); //
            let arrData=[];
            data.forEach(items=>{
                arrData.push(items.exerciseId);
            })
            const obj = {
                data:arrData,
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
module.exports = new CollectionsController();
