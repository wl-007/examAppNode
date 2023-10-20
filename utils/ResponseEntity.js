/**
 * 返回给前端的消息体
 */
class ResponseEntity {
    CODE_SUCCESS = 1;
    CODE_ERROR = 0;
  
    /**
     *@Desc: 成功时返回给前端的信息
     *@Author: Wanglei
     *@Date: 2023-04-07 10:33:54
     *@param {}  
    */
     success({ msg, data } = {}) {
        let result = {};
        result.code = this.CODE_SUCCESS;
        result.msg = msg ? msg : '操作成功';
        data ? (result.data = data) : null;
        return JSON.stringify(result);
    }
    /**
     *@Desc: 失败时返回给前端的信息
     *@Author: Wanglei
     *@Date: 2023-04-07 10:33:54
     *@param {}  
    */
    error({ msg, data } = {}) {
        let result = {};
        result.code = this.CODE_ERROR;
        result.msg = msg ? msg : '操作失败';
        data ? (result.data = data) : null;
        return JSON.stringify(result);
    }
}
module.exports = new ResponseEntity();