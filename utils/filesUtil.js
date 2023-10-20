const multer = require('multer');
const fs = require("fs");
const path = require('path');

// 上传文件
module.exports.uploadFiles = ({ dir = "./public/temp", key = "file", size = 10000 } = {}) => {
    // 1. 对参数进行解构并设置默认值
    // 2. 设置 multer 的参数，配置 diskStorage，来控制文件存储的位置以及文件名字等
    const storage = multer.diskStorage({
        // 2.1 确定图片存储的位置
        destination: function (req, file, cb) {
            // 当 dir 所对应目录不存在时，则自动创建该文件
            try {
                fs.accessSync(dir);
            } catch (error) {
                fs.mkdirSync(dir);
            }
            cb(null, dir);
        },
        // 2.2 确定图片存储时的名字。（注意：如果使用原名，可能会造成再次上传同一张图片的时候的冲突）
        filename: function (req, file, cb) {
            var changedName = new Date().getTime() + parseInt(Math.random() * 10) + path.extname(file.originalname);
            cb(null, changedName);
        }
    });
    // 3. 配置图片限制
    const limits = {
        // 限制文件大小
        fileSize: 1024 * size,
        // 限制文件数量
        files: 10
    };
    // 4.生成的专门处理上传的一个工具，可以传入 storage、limits 等配置
    const upload = multer({ storage, limits });
    // 5. 返回多文件上传的设置信息（同样可用于单文件上传）
    return upload.array(key);
}

// 移动文件
module.exports.moveFiles = ({ fromPath, toPath, filename } = {}) => {
    if (!filename) {
        console.log('========== 文件移动失败: filename 文件名不能为空 ==========');
        return;
    }
    // 要移动的文件的原路径
    const sourceFile = path.join(fromPath, filename);
    // 判断源文件是否存在
    try {
        fs.accessSync(sourceFile);
    } catch (error) {
        console.log('========== 文件移动失败：' + sourceFile + ' 该文件不存在。==========');
        return;
    }
    // 判断文件要移动的新路径是否存在，如果不存在，则创建
    try {
        fs.accessSync(toPath);
    } catch (error) {
        fs.mkdirSync(toPath);
    }
    // 文件移动后的新路径
    const newFile = path.join(toPath, filename);
    fs.renameSync(sourceFile, newFile);
    return { newPath: newFile };
}
