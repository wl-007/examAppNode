//引入数据模型对象，这个对象中就包含了数据库的所有操作
const TypesModel = require('../models/TypesModel');
const TestsModel = require('../models/TestsModel');
const ExercisesModel = require('../models/ExercisesModel');
const TestedsModel = require('../models/TestedsModel');
const CollectionsModel = require('../models/CollectionsModel');
const errorsModel = require('../models/ErrorsModel');
const Utils = require('../utils/Utils');
const ResponseEntity = require('../utils/ResponseEntity');
class TestsController {
    // 查询所有试卷类型
    async findTestsType(req, res, next) {
        try {
            let data = await TypesModel.find(); //
            const obj = {
                data,
                msg: '查询成功',
            };
            const result = ResponseEntity.success(obj);
            res.send(result);
        } catch (error) {
            const obj = {
                msg: error.message,
            };
            const result = ResponseEntity.error(obj);
            res.send(result);
        }
    }
    // 根据试卷id查询试卷信息
    async findTestsById(req, res, next) {
        try {
            const { testsId } = req.body;
            const bearerToken = req.get('Authorization');
            const stuId = Utils.getCurrentId(bearerToken);
            let data = await TestsModel.findOne({ _id: testsId }).populate('exerciseId typeId'); //
            data = { ...data._doc };
            let myExercise = [];
            data.exerciseId.forEach((items, index) => {
                myExercise[index] = { ...data.exerciseId[index]._doc }
            })
            data.exerciseId = myExercise;
            for (let i = 0; i < data.exerciseId.length; i++) {
                const element = data.exerciseId[i];
                const resData = await CollectionsModel.findOne({ exerciseId: element._id, studentId: stuId }); //,studentId:stuId
                let isC = 0;  // 该题该学生是否收藏
                if (resData) {
                    isC = 1;
                }
                data.exerciseId[i] = { ...data.exerciseId[i], isC }
            }
            console.log(data);
            const obj = {
                data,
                msg: '查询成功',
            };
            const result = ResponseEntity.success(obj);
            res.send(result);
        } catch (error) {
            const obj = {
                msg: error.message,
            };
            const result = ResponseEntity.error(obj);
            res.send(result);
        }
    }
    // 根据试卷id查询试卷信息以及考试结果 解析界面使用
    async findResultById(req, res, next) {
        try {
            const { testsId } = req.body;
            const bearerToken = req.get('Authorization');
            const stuId = Utils.getCurrentId(bearerToken);
            let data = await TestedsModel.findOne({ testId: testsId, studentId: stuId }).populate({
                path: 'testId',
                populate: {
                    path: 'exerciseId',
                },
            });
            // 构造返回的数据
            let resData = {};
            if (data) {
                const title = data.testId.title; // 试卷标题
                const score = data.score; //成绩
                const durations = data.durations; //时长 分钟
                const stuAnswers = data.answers; //学生答案
                let exercises = data.testId.exerciseId; //试卷题目
                const myExercise = [];
                exercises.forEach((items, index) => {
                    myExercise[index] = { ...exercises[index]._doc }
                })
                exercises = myExercise;
                for (let i = 0; i < exercises.length; i++) {
                    const element = exercises[i];
                    const resData = await CollectionsModel.findOne({ exerciseId: element._id, studentId: stuId }); //,studentId:stuId
                    let isC = 0;  // 该题该学生是否收藏
                    if (resData) {
                        isC = 1;
                    }
                    //  默认解析
                    exercises[i].analysis == "" ? exercises[i].analysis = "答非所问，词不达意。" : "";
                    exercises[i] = { ...exercises[i], isC }
                }
                const accuracy = data.accuracy; //学生答案
                resData = { title, score, durations, stuAnswers, exercises, accuracy };
            }
            const obj = {
                data: resData,
                msg: '查询成功',
            };
            const result = ResponseEntity.success(obj);
            res.send(result);
        } catch (error) {
            const obj = {
                msg: error.message,
            };
            const result = ResponseEntity.error(obj);
            res.send(result);
        }
    }
    // 返回当前有效的考试数据 且排除当前学生已做过的
    async findNeedTests(req, res, next) {
        try {
            const { typeId } = req.body;
            const bearerToken = req.get('Authorization');
            const stuId = Utils.getCurrentId(bearerToken);
            const TestedsData = await TestedsModel.find(
                { studentId: stuId },
                { testId: 1 }
            ).populate({
                path: 'testId',
                select: ['title', 'start-time', 'end-time', 'durations'],
            }); //
            const testIds = TestedsData.map((items) => items.testId);
            const Ids = testIds.map((items) => items._id); //已完成考试的id
            // $nin  不在某个范围
            const selectOP = { _id: { $nin: Ids }, form: 1 };
            if (typeId) {
                selectOP.typeId = typeId;
            }
            const testsData = await TestsModel.find(selectOP).select([
                'title',
                'start-time',
                'end-time',
                'durations',
                'typeId'
            ]);
            const obj = {
                data: testsData,
                msg: '查询成功',
            };
            const result = ResponseEntity.success(obj);
            res.send(result);
        } catch (error) {
            const obj = {
                msg: error.message,
            };
            const result = ResponseEntity.error(obj);
            res.send(result);
        }
    }
    // 返回当前学生已完成的试卷
    async findTesteds(req, res, next) {
        try {
            const { typeId } = req.body;
            const bearerToken = req.get('Authorization');
            const stuId = Utils.getCurrentId(bearerToken);
            const selectOP = { studentId: stuId };
            if (typeId) {
                selectOP.typeId = typeId;
            }
            console.log(selectOP);
            let data = await TestedsModel.find(selectOP, { testId: 1 }).populate({
                path: 'testId',
                select: ['title', 'start-time', 'end-time', 'durations', 'testId'],
            }); //
            const tests = data.map((items) => items.testId); //试卷明细，转换成一级数据目录
            // const Ids = testIds.map((items) => items._id);
            const obj = {
                data: tests,
                msg: '查询成功',
            };
            const result = ResponseEntity.success(obj);
            res.send(result);
        } catch (error) {
            const obj = {
                msg: error.message,
            };
            const result = ResponseEntity.error(obj);
            res.send(result);
        }
    }

    // 增加已完成的试卷
    async addTesteds(req, res, next) {
        try {
            const { testId, answers, score, accuracy, durations } = req.body;
            const bearerToken = req.get('Authorization');
            const studentId = Utils.getCurrentId(bearerToken);
            let typeId = await TestsModel.findOne({ _id: testId }).select('typeId');
            typeId = typeId.typeId;
            let data = await TestedsModel.create({
                testId,
                studentId,
                answers,
                score,
                accuracy,
                durations,
                typeId,
            });

            const obj = {
                data: { studentId: data.studentId, testId: data.testId },
                msg: '增加成功',
            };
            const result = ResponseEntity.success(obj);
            res.send(result);
        } catch (error) {
            const obj = {
                msg: error.message,
            };
            const result = ResponseEntity.error(obj);
            res.send(result);
        }
    }
    // 增加已完成的试卷 后端接口
    async addTestedsNew(req, res, next) {
        try {
            const { testId, answers, durations } = req.body;
            const bearerToken = req.get('Authorization');
            const studentId = Utils.getCurrentId(bearerToken);
            let testData = await TestsModel.findOne({ _id: testId }).select(['typeId', 'exerciseId']).populate({
                path: 'exerciseId',
            });
            const typeId = testData.typeId;
            const exercises = testData.exerciseId;
            let score = 0; //得分
            let accuracy = 0; //正确率
            let err = [];// 错题
            let rtn = getScore(exercises, answers)
            console.log(rtn);
            score = rtn[0]; accuracy = rtn[1]; err = rtn[2];
            let data = await TestedsModel.create({
                testId,
                studentId,
                answers,
                score,
                accuracy,
                durations,
                typeId,
            });
            // 错题增加
            let errData = [];
            for (let i = 0; i < err.length; i++) {
                const element = err[i];
                const rtn = await errorsModel.findOne({ studentId, exerciseId: element.exerciseId });
                if (rtn == null) {
                    errData.push({ ...element, studentId })
                } else {

                }
            }
            await errorsModel.insertMany(errData);
            // 反回参数
            const obj = {
                data:{score,err,accuracy},
                msg: '增加成功',
            };
            const result = ResponseEntity.success(obj);
            res.send(result);
        } catch (error) {
            const obj = {
                msg: error.message,
            };
            const result = ResponseEntity.error(obj);
            res.send(result);
        }
    }
}
//获取得分信息
function getScore(exercises, stuAnswer) {
    let score = 0;
    let accuracy = 0;
    let err = [];
    exercises.forEach((items, index) => {
        if (stuAnswer[index]) { //存在值才判断
            if (items.type == 0) {//单选
                if (items.answer.join() == stuAnswer[index].join()) {
                    score += items.score;
                    accuracy++;
                } else { // 错题
                    err.push({ exerciseId: items._id, errorAnswer: stuAnswer[index] })
                }
            } else if (items.type == 1) { //多选
                if (items.answer.join() == stuAnswer[index].join()) {
                    score += items.score;
                    accuracy++;
                } else if (items.answer.join().indexOf(stuAnswer[index].join()) > -1) {// 选择了多选中的其中一些答案
                    score += (Math.floor(items.score * stuAnswer[index].length / items.answer.length))
                    err.push({ exerciseId: items._id, errorAnswer: stuAnswer[index] }); //记录错题
                } else {
                    err.push({ exerciseId: items._id, errorAnswer: stuAnswer[index] })
                }
            }
        }
    })
    accuracy = Math.floor((accuracy / exercises.length) * 100).toFixed(2) + "%";
    return [score, accuracy, err];
}
module.exports = new TestsController();
