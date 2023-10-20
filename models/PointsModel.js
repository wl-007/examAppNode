const {Schema,model} = require('mongoose')

// 映射数据模型的所有字段
const PointsSchema = new Schema({
    "knowledge":String,
},{versionKey:false})  //不开启版本号



module.exports = model("PointsModel",PointsSchema,'points')