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
app.use('/goods', goodsRoute);

app.listen(serverPort, hostname, () => {
    console.log(`server listening on port ${serverPort}`);
});
