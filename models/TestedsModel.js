// 已完成试卷模型 testeds
const { Schema, model, SchemaType } = require('mongoose');

// 映射数据模型的所有字段
const TestedsSchema = new Schema(
    {
        "studentId": {   		// 所属学员 _id
            "type": Schema.Types.ObjectId,
            "ref": 'StudentsModel'
        },
        "testId": {  			// 关联试卷 _id
            "type": Schema.Types.ObjectId,
            "ref": 'TestsModel'
        },
        "typeId": {
            "type": Schema.Types.ObjectId,
            "ref": 'TypesModel'
        },
        "answers": [[Number]], 	// 学生考试答案
        "score": Number, 		// 成绩
        "accuracy": String,		// 正确率
        "durations": String 	// 答题时长 单位秒
    },
    { versionKey: false } //不开启版本号
);
module.exports = model('TestedsModel', TestedsSchema, 'testeds');
