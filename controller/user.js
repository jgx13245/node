
//这是业务逻辑层
//引入数据层的模板
const UserModel =  require("../model/user.js");
const crypto = require('crypto');


//自己要做的事情
const register = (req,res)=>{
	//将前端请求得到的数据结构赋值
	////确保用户存进的密码是加密的，所以使用加密模板
	const {name,password} = req.body;
	

	//判断是否在数据库里有重名(这里定义方法，model里面必须设置方法)
	UserModel.findOneUser({name},(result)=>{
		//console.log(result);
		if(result.length>0){
			res.json({
				ret:true,
				data:false
			})
		}else{
			const hash = crypto.createHash('sha256');
			hash.update(password);
			UserModel.saveUser({name,password:hash.digest('hex')},()=>{
				res.json({
					ret:true,
					data:true
				})

			},()=>{
				res.json({
					ret:true,
					data:false
				})
			})

		}
	})	

};


const login = (req,res)=>{
	const {name,password} = req.body;
	//将前端传过来的密码进行加密 和后端的进行对比查找
	const hash = crypto.createHash('sha256');
	hash.update(password);
	//后端开始在数据库里找
	UserModel.findOneUser({name,password: hash.digest('hex')},(result)=>{
		//console.log(result);
		if(result.length>0){
			//吧用户的信息使用这个中间价存储在永久存储中
			req.session.login=true;
			//挂一个名字，使得登录的时候可以显示用户名
			req.session.username=name;
			res.json({
				ret:true,
				data:{
					login:true
				}
			})
		}else{
			res.json({
				ret:true,
				data:{
					login:false
				}
			})
			
		}
	})	

};



const isLogin = (req,res)=>{
	if(req.session.login){
		res.json({
			ret:true,
			data:{
				login:true,
				username:req.session.username
			}
		})
	}else{
		res.json({
			ret:true,
			data:{
				login:false
			}
		})
	}

};


const loginOut = (req,res)=>{
	req.session.login=null;
	res.json({
		ret:true,
		data:{
			login:true
		}
	})

};




// const login = (req,res)=>{
// 	//将前端请求得到的数据结构赋值
// 	////确保用户存进的密码是加密的，所以使用加密模板
// 	const {name,password} = req.body;
// 	//console.log(name);
	
// 	hash.update(password);
// 	var password1=hash.digest('hex')
// 	//console.log(password1);
// 	//判断是否在数据库里有重名(这里定义方法，model里面必须设置方法)
// 	UserModel.findOneUser({name},(result)=>{
// 	 	console.log(result);
// 	   		if(result[0].name==name&&result[0].password==password1){
// 	   			res.json({
// 					ret:true,
// 					data:true
// 				})
// 	  	 	}else{
// 	  	 		res.json({
// 					ret:true,
// 					data:false
// 				})
// 	  	 	}
// 		})

module.exports = {register,login,isLogin,loginOut};