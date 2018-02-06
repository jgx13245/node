//引入这个模块 npm  install mongoose
var  mongoose = require("mongoose");
//连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/inf",{useMongoClient:true});
mongoose.Promise = global.Promise;

module.exports = mongoose;