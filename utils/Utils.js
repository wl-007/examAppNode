const { log } = require('console');
const Crypto = require('crypto');
const jwt = require('jsonwebtoken');
const imgURL ="/public/images/"
class Utils {
    /**
     * 获取指定时区的时间戳；因为目前还无法直接修改date对象的时区，所以使用时间戳方式返回
     * @param {时间对象} date 
     * @param {时差} zone   比如东八区与格林威治时间（GMT）差8小时就传 8  getZoneTime(date, 8)
     * @returns 
     */
    getZoneTime(date, zone) {
        var offset_GMT = date.getTimezoneOffset();//获取本地时间与格林威治时间的时间差(注意是分钟)
        var current = date.getTime();
        var targetDate = new Date(current + offset_GMT * 60 * 1000 + zone * 60 * 60 * 1000);
        return targetDate.getTime();
    }
    /**
     * ?DESC: 时间格式化
     * @param {要格式化的日期格式} type   YYYY-MM-DD hh:mm:ss.S
     * @param {时间对象} date 
     * @returns 
     */
    getFormatTime(type, date) {
        let formatTime = type.replace("YYYY", date.getFullYear()).replace("MM", date.getMonth() + 1).replace("DD", date.getDate());//年月日
        formatTime = formatTime.replace("hh", date.getHours() < 10 ? "0" + date.getHours() : date.getHours());//时
        formatTime = formatTime.replace("mm", date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());//分
        formatTime = formatTime.replace("ss", date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());//秒
        formatTime = formatTime.replace("S", date.getMilliseconds());//毫秒
        return formatTime;
    };
    /**
     * 对数据进行加密   密码加密使用
     * @param {Sting} str 
     * @param {Sting} secret 
     * @returns 
     */
    getCrypto(str, secret = '') {
        const md5 = Crypto.createHash('md5')
        // return md5.update('需要加密的字符串'+'秘钥').digest('hex')
        return md5.update(str + secret).digest('hex')
    }
    /**
     *@Desc: 获取密钥
     *@Author: Wanglei
     *@Date: 2023-04-07 15:10:45
     *@param {Sting} type  类型
     */
    getSecret(type = 'token') {
        return 'L9hT0A7q5Pno3UXm'
    }
    /**
     *@Desc: 生成token
     *@Author: Wanglei
     *@Date: 2023-04-07 15:10:45
     *@param {String} id 用户表_id
     *@param {String} secret 密钥
     *@param {Number} timeLimit 时效 秒
     */
    getToken(id,secret="" ,timeLimit = 60 * 60,) {
         secret = this.getSecret();
        //生成token
        const token = jwt.sign(
            { _id: id}, //用于保存用户的相关信息
            secret, //秘钥，不能公布出去
            { expiresIn: timeLimit } //设置token的有效期,时间以秒为单位
        )
        return token
    }
    /**
     *@Desc: 解析token
     *@Author: Wanglei
     *@Date: 2023-04-07 15:10:45
     *@param {String} bearerToken 前端传递的 Authorization
     *@param {String} secret 密钥
     */
    verifyToken(bearerToken) {
        const  secret = this.getSecret();
        //获取到真实的token
        const token = bearerToken.split(' ')[1];
        //解码token
        const decode = jwt.verify(
            token,
            secret //秘钥
        )
        return decode
    }
     /**
     *@Desc: 通过token获取当前用户
     *@Author: Wanglei
     */
    getCurrentId(bearerToken="") {
        const  decode = this.verifyToken(bearerToken);
        return decode._id;
    }
    /**
     *@Desc: 时间对象转秒时间戳 以及 秒时间戳转时间对象;用于数据库村粗
     *@Author: Wanglei
     *@Date: 2023-04-12 10:14:05
     *@param {}  
    */
    dateToMM(date){
        return Math.ceil(date.getTime() /1000);
    }
    mmToDate(mm){
       const dateObj= new Date(mm*1000) ;
        return dateObj;
    }
   
}

module.exports = new Utils();
