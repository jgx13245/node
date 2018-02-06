//引入数据库的链接(数据层   c层)
const mongoose = require("../utils/database.js");

//如果没有数据库表，就创建数据库表
const User = mongoose.model('user',{
	name:String,
	password:String
}) ;
//向表里存数据，成功调用succCb方法，失败就用errCb方法
 const saveUser = (userinfo,succCb,errCb) => {
 
 	const user = new User(userinfo);
 	user.save().then(
 		()=>{succCb();}).catch(()=>{errCb();});
 };



 //创建一个方法，让controller里面使用
  	const findOneUser = (userinfo,succCb)=>{
  		User.find(userinfo).then((result)=>{
  			succCb(result);
  		});
  	};

 
 // 把自己导出
  module.exports = {saveUser,findOneUser}