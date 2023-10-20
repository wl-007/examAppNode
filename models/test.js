const { Schema, model, SchemaType } = require('mongoose');
// 定义验证函数
function Int8(key, options) {
    SchemaType.call(this, key, options, 'Int8');
}
Int8.prototype = Object.create(SchemaType.prototype);
Int8.prototype.cast = function (val) {
    var _val = Number(val);
    if (isNaN(_val)) {
        throw new SchemaType.CastError("Int8",'Int8: ' + val + ' is not a number',"age");
    }
    _val = Math.round(_val);
    if (_val < -0x80 || _val > 0x7f) {
        throw new SchemaType.CastError(
            'Int8: ' + val + ' is outside of the range of valid 8-bit ints'
        );
    }
    return _val;
};
// 将相应的属性添加到 mongoose.Schema.Types
Schema.Types.Int8 = Int8;

// 映射数据模型的所有字段
const UsersSchema = new Schema(
    {
        username: { type: String, required: true },
        password: String,
        order: Array,
        age: {type:Int8,required:false},//使用自定义验证类型
        img: {
            type:String,
            default:"default.png"
        },
        creatDate: { type: Date, default: Date.now },
        birthday: { type: Date, default: new Date('2020-10-10 09:00:00').toLocaleString('zh', { hour12: false }) },
        Tbirthday:String,
        phone: {
            type: String,
            validate: { //自定义验证器
                validator: function (v) {
                    return true;
                    return /\d{3}-\d{3}-\d{4}/.test(v);
                },
                message: '{VALUE} is not a valid phone number!',
            },
            required: [true, 'User phone number required'],
        },
        updateUser:String,
    },
    { versionKey: false }//不开启版本号
); 
module.exports = model('UsersModel', UsersSchema, 'users');
