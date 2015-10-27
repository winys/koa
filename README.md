#koa-saber

*Koa saber, but a tools kit.*

### Version log

##### 0.0.1
- First commit.

### How to use it

- In app.js

```js
    var koa = require('koa'),
    koa_gzip = require('koa-gzip'),
    koa_derouter = require('koa-derouter'),
    koa_saber = require("koa-saber");    

    var app = koa();

    //初始化配置
    koa_saber({
        config_path: process.cwd() + "/common/config.js",
        function_path : process.cwd() + "/common/function.js",
    });
    $.config("app_path",process.cwd());

    //规定中间件
    app.use(koa_gzip());
    app.use(koa_derouter($.config("derouter")));

    //启动服务器
    app.listen(3000);
```

###Tip

- Functions in function.js will be added into saber($), but only function. 