// 试题模型 notices
const { Schema, model, SchemaType } = require('mongoose');

// 映射数据模型的所有字段
const NoticesSchema = new Schema(
    {

        "title": String,
        "intro": String,
        "details": String,
        "date": String,
        		
    },
    { versionKey: false } //不开启版本号
);
module.exports = model('NoticesModel', NoticesSchema, 'notices');
