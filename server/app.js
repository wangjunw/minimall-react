const express = require('express');
const app = express();
const mongoose = require('mongoose');
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
// 连接数据库
mongoose.connect(`mongodb://${hostname}:${mongodbPort}/${dbName}`);
mongoose.connection.on('connected', () => {
    console.log('mongodb connected success');
});
mongoose.connection.on('error', () => {
    console.log('mongodb connected fail');
});
// 监听连接断开
mongoose.connection.on('disconnected', () => {
    console.log('mongodb connected disconnected');
});

// 路由配置
app.use('/goods', goodsRoute); //商品接口
app.use('/user', userRoute);
app.listen(serverPort, hostname, () => {
    console.log(`server listening on port ${serverPort}`);
});
