var models = require('../model/user.js');
var crypto = require('crypto');

module.exports = {
    register: async (ctx, next) => {
        await ctx.render('web/register', {
            title:'注册'
        });
    },
    UserRegister: async (ctx, next) => {
        try {
            var userInfo = {
                username : ctx.request.body.username,
                password : ctx.request.body.password,
            }
            var md5 = crypto.createHash('md5');
            userInfo.salt=new Date()+userInfo.username;//md5 salt
            userInfo.password=md5.update(userInfo.password+userInfo.salt,'utf8').digest('base64');//md5加盐加密
            var checkUserName = await models.User.find({username:userInfo.username});
            if (checkUserName.length == 0 ) {
              await models.User.create(userInfo);
              ctx.body = "注册成功！";
            }else {
              ctx.body = "此用户名已被占用！";
            }
        }catch (e) {
            ctx.body = "注册失败，系统错误";
        }
    }
}
