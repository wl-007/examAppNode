const {expressjwt} = require('express-jwt')
const utils = require('./Utils')
const select = utils.getSecret()

const jwtAuth = expressjwt({
    secret:select, //秘钥 
    algorithms:['HS256'], //jwt的验证算法
    //前端如果没有发送token过来，也会直接返回401的状态
    //false代表验证是否包含token
    credentialsRequired:true
}).unless({
    //用于配置不需要身份认证的接口
    path:[
        /\/login/,/\/register/
    ]
})

module.exports = jwtAuth