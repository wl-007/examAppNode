const testedsModel = require('../models/TestedsModel');
const exercisesModel = require('../models/ExercisesModel');
const studentsModel = require('../models/StudentsModel');
const testsModel = require('../models/TestsModel');
const errorsModel = require('../models/ErrorsModel');
const Utils = require('../utils/Utils');
const { login } = require('./UserController');
async function find(req, res, next) {
    try {
        ref: 'exercisesModel'
        const bearerToken = req.get('Authorization');
        let studentId = Utils.getCurrentId(bearerToken)
        let result = await errorsModel.find({ studentId }).populate('studentId').populate('exerciseId');
        res.send({ code: 1, msg: `查询完毕`, data: result });
    } catch (error) {
        res.send({ code: 0, msg: error.message })
    }

}
async function add(req, res, next) {
    try {
        let { dataArr } = req.body;
        const bearerToken = req.get('Authorization');
        let studentId = Utils.getCurrentId(bearerToken);
        let data = [];
        for (let i = 0; i < dataArr.length; i++) {
            const element = dataArr[i];
            const rtn = await errorsModel.findOne({ studentId, exerciseId: element.exerciseId });
            if (rtn == null) {
                data.push({ ...element, studentId })
            } else {

            }
        }
        // let result = await errorsModel.create({ studentId, exerciseId, errorAnswer });
        let result = await errorsModel.insertMany(data);
        res.send({ code: 1, msg: '添加成功', data: result });
    } catch (error) {
        res.send({ code: 0, msg: error.message })
    }

}

async function del(req, res, next) {
    try {
        let { exerciseId } = req.body;
        const bearerToken = req.get('Authorization');
        let studentId = Utils.getCurrentId(bearerToken)
        // let { studentId, exerciseId } = req.body;
        let result = await errorsModel.deleteMany({ studentId, exerciseId })
        res.send({ code: 1, msg: `已删除` })
    } catch (error) {
        if (result.deletedCount > 0) {
            res.send({ code: 1, msg: `已删除`, data: result })
        } else {
            res.send({ code: 0, msg: '删除失败' })
        }
    }



}
module.exports = { find, add, del }