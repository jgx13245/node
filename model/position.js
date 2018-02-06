//引入数据库的链接(数据层   c层)
const mongoose = require("../utils/database.js");

//如果没有数据库表，就创建数据库表
const Position = mongoose.model('position',{
	position:String,
	salary:String,
	company:String,
  logo:String
});

const savePosition=(positioninfo,succCb) => {
 
 	const position = new Position(positioninfo);
 	position.save().then(
 		()=>{succCb();}).catch(()=>{errCb();});
 };

 const findAll=(succCb)=>{
 	//这里find不能为空，必须有个东西，最好是空对象
 	Position.find({}).then((result)=>{
  			succCb(result);
  		});
 };
 const findPageList= (listinfo,succCb)=>{
 	const {count,page} = listinfo;
 	Position.find({}).limit(parseInt(count,10)).skip((page-1)*count).then((result)=>{
  			succCb(result);
  		});
 };
 const deleteItem1=(id,succCb)=>{
	Position.findByIdAndRemove(id).then((result)=>{
  			succCb(result);
  		});
 }
 
 const updateItem1=(id,succCb)=>{
  Position.findById(id).then((result)=>{
        succCb(result);
      });
 }

 const updatePosition=(positioninfo,succCb)=>{
    const { id,position,salary,company,logo} =positioninfo;
    console.log(positioninfo);
    Position.findByIdAndUpdate(id,{$set:{position:position,salary:salary,company:company,logo:logo}}).then(()=>{

        succCb();
      });
 }
 // 把自己导出
  module.exports = {savePosition,findAll,findPageList,deleteItem1,updateItem1,updatePosition}