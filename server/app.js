const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {
    serverPort,
    hostname,
    mongodbPort,
    dbName
} = require('./config/config');
const goodsRoute = require('./routes/goods');
const userRoute = require('./routes/users');

// 设置静态资源（注意：请在当前目录下启动app.js，在外层启动会有问题）
app.use(express.static('static'));
// 解析body，需要使用body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());

// 连接数据库, 第二个参数是解决警告，具体：https://mongoosejs.com/docs/deprecations.html
mongoose.connect(`mongodb://${hostname}:${mongodbPort}/${dbName}`, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('mongodb connected success');
});
mongoose.connection.on('error', () => {
    console.log('mongodb connected fail');
});
mongoose.connection.on('disconnected', () => {
    console.log('mongodb connected disconnected');
});

// 路由配置
app.use('/goods', goodsRoute); //商品接口
app.use('/user', userRoute);

// 服务监听端口
app.listen(serverPort, hostname, () => {
    console.log(`server listening on port ${serverPort}`);
});
