var express = require('express');
var router = express.Router();
//默认是model下的index.js文件，所以可以不写
var todoModel = require('../model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//给路由先指定路径，再指定方法，还可以链式调用
router.route('/todos').get( function(req, res, next) {
  todoModel.find({},function(err,todos){
    if(err){
      res.send({code:0,msg:'查询错误！'});
    }else{
      res.send(todos);
    }
  });
}).post(function(req,res){
  //console.log(req.body);
  todoModel.create(req.body,function(err,todo){
    if(err){
      res.send({code:0,msg:'添加错误！'});
    }else{
      //把保存到数据库中之后的对象发送给客户端
      res.send(todo);
    }
  });
});

//删除操作
router.route('/todos/:id').delete(function(req,res){
  todoModel.remove({_id:req.params._id},function(err,result){
    if(err){
      res.send({code:0,msg:'删除失败！'});
    }else{
      //把保存到数据库中之后的对象发送给客户端
      res.send({code:1,msg:'删除成功！'});
    }
  })
});

//批量删除操作
router.route('/todos/delete').post(function(req,res){
  var ids = req.body;
  //console.log(ids);
  //在这个集合当中{_id:{$in:ids}}
  todoModel.remove({_id:{$in:ids}},function(err,result){
    if(err){
      console.log(err);
      res.send({code:0,msg:'删除失败！'});
    }else{
      res.send({code:1,msg:'删除成功！'});
    }
  })
});

/*
router.get('/todos', function(req, res, next) {
  todoModel.find({},function(err,todos){
    if(err){
      res.send({code:0,msg:'查询错误！'});
    }else{
      res.send(todos);
    }
  });
});

router.post('/todos',function(req,res){
  //console.log(req.body);
  todoModel.create(req.body,function(err,todo){
    if(err){
      res.send({code:0,msg:'添加错误！'});
    }else{
      //把保存到数据库中之后的对象发送给客户端
      res.send(todo);
    }
  });
});
*/

module.exports = router;
