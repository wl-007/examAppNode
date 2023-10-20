// 试题模型 exercises
const { Schema, model, SchemaType } = require('mongoose');

// 映射数据模型的所有字段
const ExercisesSchema = new Schema(
    {
        "topics": String, 	// 题目、题干
        "options": Array,  	// 选项 ['HTML', 'CSS', 'JS', 'Nodejs']
        "answer": [Number], 	// 正确答案的下标 [1] 或者 [0, 1] 一个元素为单选题答案，多个元素则是多选题答案
        "analysis": String, // 解析
        "type": 0,			// 考题是单选还是多选: 0 为单选 ,1 为多选
        "score": {   		// 每一题的分数，默认每一道题 3 分
            "type": Number,
            "default": 3
        },
        "pointId": {  		// 题目所属知识点
            "type": Schema.Types.ObjectId,
            "ref": 'PointsModel'
        }
    },
    { versionKey: false } //不开启版本号
);
module.exports = model('ExercisesModel', ExercisesSchema, 'exercises');
