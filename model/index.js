var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/betesytodo');
//定义一个模型并导出
module.exports = mongoose.model('todo',mongoose.Schema({
    text:String
}));
