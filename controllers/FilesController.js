//写文件上传的逻辑以及返回
const { uploadFiles,moveFiles } = require('../utils/filesUtil')
const Utils = require('../utils/utils');
const StudentsModel = require('../models/StudentsModel');
const ResponseEntity = require("../utils/ResponseEntity")
class FilesController {
    fileUp(req, res) {
        const uploading = uploadFiles();
        uploading(req, res, (err) => {
            if (err) {
                const obj={
                    msg: '文件上传失败'
                }
                const result=ResponseEntity.error(obj);
                res.send(result)
            } else {
                //文件上传成功
                //req.files就是文件上传成功后的一些相关的文件信息
                // console.log(req.files)
                if (req.files.length > 0) {
                    const obj={
                        msg: '文件上传成功',
                        data: `/temp/${req.files[0].filename}`
                        // data: req.files
                    }
                    const result=ResponseEntity.error(obj);
                    res.send(result)
                } else {
                    const obj={
                        msg: '文件上传失败'
                    }
                    const result=ResponseEntity.error(obj);
                    res.send(result)
                }
            }
        })
    }
    //后端修改用户信息的接口
    async updateHeadImg(req, res) {
        const bearerToken = req.get('Authorization')
        // console.log(bearerToken)
        if (bearerToken) {
            //解码token
            const _id=Utils.getCurrentId(bearerToken);
            const {filename} = req.body
            // console.log(filename);
            const fromPath='public/temp/'
            const toPath='public/images/'
            if (filename) {
                //将图片移动到images文件夹下
                try {
                    moveFiles({
                        fromPath,
                        toPath,
                        filename
                    })
                    // 修改用户信息
                    // console.log(toPath+filename );
                    const data = await StudentsModel.updateOne({ _id }, { avatar:'/images/'+filename });
                   
                    const obj={
                        msg: '修改成功'
                    }
                    const result=ResponseEntity.success(obj);
                    res.send(result);
                } catch (error) {
                    const obj={
                        msg: '头像修改失败'
                    }
                    const result=ResponseEntity.error(obj);
                    res.send(result);
                }
            }
        } else {
            const obj={
                msg: 'token失效'
            }
            const result=ResponseEntity.error(obj);
            res.send(result);
        }
    }
}
module.exports = new FilesController();