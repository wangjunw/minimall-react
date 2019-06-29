let express = require('express');
let router = express.Router();
let User = require('../models/user');
// 获取订单详情
router.get('/detail', async (req, res) => {
    let uid = req.cookies.uid;
    let orderId = req.query.orderId;
    let user = await User.findOne({ uid });
    if (!user) {
        res.json({
            code: -1,
            message: 'who are you？'
        });
        return;
    }
    let orderDetail = {};
    user.orders.forEach(item => {
        if (orderId === item.orderId) {
            orderDetail = item;
            return;
        }
    });
    res.json({
        code: 0,
        message: 'success',
        data: orderDetail
    });
});
// 获取地址列表
router.get('/address', async (req, res) => {
    let uid = req.cookies.uid;
    let user = await User.findOne({ uid });
    if (!user) {
        res.json({
            code: -1,
            message: 'who are you？'
        });
        return;
    }
    res.json({
        code: 0,
        message: 'success',
        data: user.addresses
    });
});
// 确认支付
router.post('/confirm', async (req, res) => {
    let uid = req.cookies.uid;
    let orderId = req.body.orderId;
    let user = await User.findOne({ uid });
    if (!user) {
        res.json({
            code: -1,
            message: 'who are you？'
        });
        return;
    }
    user.orders.forEach(item => {
        if (item.orderId === orderId) {
            item.status = 1;
            return;
        }
    });
    user.save();
    res.json({
        code: 0,
        message: 'success'
    });
});
module.exports = router;
