const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes/index');
const views = require('koa-views');
const convert  = require('koa-convert');
const mongoose = require('mongoose');
const path = require('path');
const session = require('koa-session');
const app = new Koa();
//post body 解析
app.use(bodyParser());

//use session
app.keys = ['jhoncy-blog'];
app.use(session(app));

//static file
app.use(convert(require('koa-static')(path.join(__dirname + '/public'))));

//支持ejs模板
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

//路由
app.use(router.routes(),router.allowedMethods());

//连接mongodb
let DATABASE_URL = 'mongodb://localhost/koa';
//use native promises Instead of mpromise //mongoose return mpromise
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL, (err) => {
  if (err) throw err;
  console.log('connect mongodb`s database success!!!!');
});
在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
