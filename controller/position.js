
//这是业务逻辑层
//引入数据层的模板
const PositionModel =  require("../model/position.js");


const add = (req,res)=>{
	//post时req.body(请求体中)，get是req.query（url解析）
	const {position,salary,company} = req.body;
	const logo = req.file.filename;
	console.log(req.body);
	console.log(req.file);
	PositionModel.savePosition({
		position,salary,company,logo
	},()=>{
		res.json({
			ret:true,
			data:true
		})
	})

};

const getList = (req,res)=>{
	const {page,count} = req.query;
	let totalPage  =1;
	PositionModel.findAll((result)=>{
		totalPage = Math.ceil(result.length/count);
		PositionModel.findPageList({page,count},(result)=>{
				res.json({
					ret:true,
					data:{
						list:result,
						total:totalPage
					}
				})
		})
	
	})
}

const deleteItem = (req,res)=>{
	const {id}=req.query;
	PositionModel.deleteItem1(id,()=>{
		res.json({
			ret:true,
			data:true
		})
	})
}

const updataItem = (req,res)=>{
	const {id}=req.query;
	console.log(req.query);
	PositionModel.updateItem1(id,(result)=>{
		res.json({
			ret:true,
			data:{
				info:result
			}
		})
	})
}

const updataGetItem=(req,res)=>{
	const { id,position,salary,company} = req.body;
	const logo = req.file.filename;
	PositionModel.updatePosition({
		id,position,salary,company,logo
	},()=>{
		res.json({
			ret:true,
			data:true
		})
	})
}

module.exports = {add,getList,deleteItem,updataItem,updataGetItem};