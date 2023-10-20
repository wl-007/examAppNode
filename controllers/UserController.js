const StudentsModel = require("../models/StudentsModel");
const { getMd5 } = require('../utils/crypto');
const jwt = require('jsonwebtoken')
const Utils = require('../utils/Utils');
const Response = require('../utils/ResponseEntity')
const { Decoded } = require('../utils/Decoded')
const TestedsModel = require("../models/TestedsModel");

// 获取秘钥
const secret = Utils.getSecret()

class StudentsController {
    // 登录
    async login(req, res, next) {
        try {
            const { phone, password } = req.body;
            //对密码进行加密处理
            const md5Pwd = getMd5(password, phone)
            const [data] = await StudentsModel.find({ phone, password: md5Pwd });
            if (data ? data._id : undefined) {
                const token = jwt.sign(
                    { _id: data._id }, //用于保存用户的相关信息
                    secret, //秘钥
                    { expiresIn: 60*3000 } //设置token的有效期,时间秒单位
                )
                res.send(Response.success({ msg: "登录成功", data: { token } }));
            } else {
                res.send(Response.error({ msg: "用户名密码错误，登录失败", }));
            }
        } catch (error) {
            res.send(Response.error({ msg: error.message, }));
        }
    }
    // 注册
    async register(req, res, next) {
        try {
            const { phone, password } = req.body;
            const [findData] = await StudentsModel.find({ phone });
            if (findData) {
                res.send(Response.error({ msg: "用户名已存在，请重试", }));
            } else {
                //需要在此处对密码进行加密处理
                const md5Pwd = getMd5(password, phone)
                const data = await StudentsModel.create({ phone, password: md5Pwd });
                if (data._id) {
                    res.send(Response.success({ msg: "用户注册成功" }));
                } else {
                    res.send(Response.error({ msg: "注册失败" }));
                }
            }
        } catch (error) {
            console.log(error);
            res.send(Response.error({ msg: "服务器报错" }))
        }
    }
    // 显示个人信息
    async getUserInfo(req, res, next) {
        try {
            const bearerToken = req.get('Authorization')
            if (bearerToken) {
                const dataId = Decoded(bearerToken)
                const data = await StudentsModel.find({ _id: dataId })
                res.send(Response.success({ data }))
            } else {
                res.send(Response.error({ msg: "token失效" }))
            }
        } catch (error) {
            res.send(Response.error({ msg: "服务器报错" }))
        }
    }
    // 修改学生信息(个人中心界面使用)
    async modify(req, res, next) {
        try {
            const { name, gender } = req.body
            const bearerToken = req.get('Authorization')
            const _id = Decoded(bearerToken)
            const data = await StudentsModel.updateOne({ _id }, { name, gender });
            res.send(Response.success({ msg: "修改成功", data }));
        } catch (error) {
            res.send(Response.error({ msg: "服务器报错" }))
        }
    }
    // 统计学生数据 练习题数 学习天数 最近考试 平均分数
    async statistics(req, res, next) {
        try {
            const bearerToken = req.get('Authorization')
            const studentId = Decoded(bearerToken);
            console.log(studentId);
            let resData = await TestedsModel.find({ studentId }).populate({
                path:"testId",
                count:"exerciseId"
            }).sort({_id:-1});   // _id 降序排序 第一个便是最近一次考试
            let curScore=0;
            if (resData.length>0) {
                curScore=resData[0].score;
            }
            let arr=[];
            let avgScore=0;
            let totalScore=0;
            resData.forEach((items,index)=>{
                arr=[...items.testId.exerciseId,...arr];
                totalScore+=items.score;
            })
            avgScore=(totalScore/resData.length).toFixed(2)
            let tempSet=new Set(arr); //去重
            arr =[...tempSet];
            const exeCounts=arr.length; // 做题数
            resData =  await StudentsModel.findOne({ _id: studentId });
            const learnDay= (((new Date()-new Date(resData.createDate))/1000) /(24*60*60)).toFixed(2);

            const data={
                exeCounts,learnDay,curScore,avgScore
            }
            res.send(Response.success({ msg: "查询", data }));
        } catch (error) {
            res.send(Response.error({ msg: "服务器报错" }))
        }
    }
}

module.exports = new StudentsController();