const jwt = require('jsonwebtoken')
const Utils = require('../utils/Utils');
// 获取秘钥
const secret = Utils.getSecret()

function Decoded(bearerToken) {
    // 得到token
    const token = bearerToken.split(' ')[1]
    // 解码token
    const decode = jwt.verify(
        token,
        secret
    )
    return decode._id
}


module.exports = {Decoded}