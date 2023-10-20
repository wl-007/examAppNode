// 试卷模型 tests
const { Schema, model, SchemaType } = require('mongoose');
// 映射数据模型的所有字段
const TestsSchema = new Schema(
    {
        "title": String,  		// 试卷标题
        "date": String,   		// 考试时间
        "form": Number,			// 当前试卷状态1: 有效 0，无效。默认 1
        "exerciseId": [         // 当前试卷关联的所有题目 _id
            {
                "type": Schema.Types.ObjectId,
                "ref": 'ExercisesModel'
            }
        ] ,
        "durations": String,    // 答题时长，单位分钟
        "end-time": String,     // 过期时间
        "start-time": String,   // 考卷创建时间
        "typeId": {			// 需求文档给的是知识点id  但表实际是类型id
            "type": Schema.Types.ObjectId,
            "ref": 'TypesModel'
        }   
    },
    { versionKey: false } //不开启版本号
);
module.exports = model('TestsModel', TestsSchema, 'tests');
