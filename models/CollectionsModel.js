// 试题模型 collections
const { Schema, model, SchemaType } = require('mongoose');

// 映射数据模型的所有字段
const CollectionsSchema = new Schema(
    {

        "studentId": {  		// 题目所属知识点
            "type": Schema.Types.ObjectId,
            "ref": 'StudentsModel'
        },

        "exerciseId": {  		// 题目所属知识点
            "type": Schema.Types.ObjectId,
            "ref": 'ExercisesModel'
        },


    },
    { versionKey: false } //不开启版本号
);
module.exports = model('CollectionsModel', CollectionsSchema, 'collections');
