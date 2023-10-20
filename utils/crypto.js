//nodejs提供的一个内置模块，用于数据加密
const crypto = require('crypto')
const Utils = require('../utils/Utils');
const Secret = Utils.getSecret()
function getMd5(str, secret = Secret) {
    const md5 = crypto.createHash('md5')
    //return md5.update('需要加密的字符串'+'秘钥').digest('hex')
    return md5.update(str + secret).digest('hex')
}

module.exports = {
    getMd5
}