const {Schema,model} = require('mongoose');
const {getFormatTime} =require("../utils/Utils");

// 映射数据模型的所有字段
const StudentsSchema = new Schema({
    "phone":String,
    "password":String,
    "avatar":{
        type:String,
        default:"/images/defalut.jpg"
    },
    "gender":{
        type:String,
        default:"none"
    },
    "name":{
        type:String,
        default:"路人甲"
    },
    "createDate":{
        type:String,
        default:(getFormatTime("YYYY-MM-DD hh:mm:ss",new Date))//默认当天
    }
},{versionKey:false})  //不开启版本号

module.exports = model("StudentsModel",StudentsSchema,'students')