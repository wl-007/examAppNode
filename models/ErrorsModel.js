// 试题模型 errors
const { Schema, model, SchemaType } = require('mongoose');

// 映射数据模型的所有字段
const ErrorsSchema = new Schema(
    {

        "studentId": {  		// 题目所属知识点
            "type": Schema.Types.ObjectId,
            "ref": 'StudentsModel'
        },

        "exerciseId": {  		// 题目所属知识点
            "type": Schema.Types.ObjectId,
            "ref": 'ExercisesModel'
        },

        "errorAnswer":  [Number] // 错误答案 		
    },
    { versionKey: false } //不开启版本号
);


// ErrorsSchema.index({studentId:1,exerciseId:1},{unique:true});

// ErrorsSchema.on('index', function (err) {
//     if (err) console.error(err); // error occurred during index creation
//   })
module.exports = model('ErrorsModel', ErrorsSchema, 'errors');
