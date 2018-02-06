var express = require('express');
var router = express.Router();
const userController = require("../controller/user.js");
const posController = require("../controller/position.js");
const upload = require("../utils/imgUpload.js");

/* 用户登录的路由配置. */
router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.get('/user/isLogin', userController.isLogin);
router.get('/user/loginOut', userController.loginOut);

/* 添加职位信息的路由配置 */
router.post('/position/add',upload.single('logo'), posController.add);
router.get('/position/getList', posController.getList);
router.get('/position/delete', posController.deleteItem);
router.get('/position/update', posController.updataItem);
router.post('/position/updateget',upload.single('logo'), posController.updataGetItem);
module.exports = router;
