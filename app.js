var express = require('express');
var path = require('path');

var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var port = process.env.PORT || 3000;
var app = express();
var fs = require('fs')
var dbUrl = 'mongodb://localhost/imooc';
mongoose.connect(dbUrl);

// models loading  模型加载，好处是无论路径如何变化，在其他模块中都可以直接mongoose.model直接调用
var models_path = __dirname + '/app/models'
var walk = function(path) {
    fs
        .readdirSync(path)
        .forEach(function(file) {
            var newPath = path + '/' + file
            var stat = fs.statSync(newPath)

            if (stat.isFile()) {    //是否是文件
                if (/(.*)\.(js|coffee)/.test(file)) {
                    require(newPath)
                }
            }
            else if (stat.isDirectory()) {    //是否是文件夹
                walk(newPath)
            }
        })
}
walk(models_path)

app.set('views','./app/views/page');
app.set('view engine','jade');
var logger = require('morgan');
app.use(require('body-parser').urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
var cookieParser = require('cookie-parser');
app.use(cookieParser());

var multipart = require('connect-multiparty');
app.use(multipart());

app.use(session({
    secret:'imooc',
    store: new mongoStore({
        url:dbUrl,
        collection: 'sessions'
    })
}))

require('./config/routes')(app)

app.locals.moment = require('moment');
app.listen(port);
var logger = require('morgan');
/*配置入口文件*/
if ('development' === app.get('env')){
    app.set('showStackError', true);
    app.use(logger(":method :url :status"));
    app.locals.pretty = true;
    mongoose.set('debug', true);
}


console.log('imooc started on port' + port);


