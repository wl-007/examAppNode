//配置路由
var express = require('express');
var router = express.Router();
const {addCollection,delCollection,getCollInfo} = require('../controllers/CollectionsController')
// 增加收藏试题
router.post('/addCollection',addCollection);
// 删除收藏试题
router.post('/delCollection',delCollection);
// 收藏信息
router.post('/getCollInfo',getCollInfo);


module.exports = router;