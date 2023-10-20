//配置路由
var express = require('express');
var router = express.Router();
const {findTestsType,findTestsById,findResultById,findNeedTests,findTesteds,addTesteds,addTestedsNew} = require('../controllers/TestsController')
// 查询所有试卷类型
router.post('/findTestsType',findTestsType);
// 根据试卷id查询试卷信息
router.post('/findTestsById',findTestsById);
// 根据试卷id查询已考试卷信息  解析界面可用
router.post('/findResultById',findResultById);
// 返回当前有效的数据 且排除当前学生已做过的
router.post('/findNeedTests',findNeedTests);
// 查询当前学生已完成的试卷列表
router.post('/findTesteds',findTesteds);
// 增加已完成的试卷列表
router.post('/addTesteds',addTesteds);
// 增加已完成的试卷列表  得分后台算
router.post('/addTestedsNew',addTestedsNew);


module.exports = router;