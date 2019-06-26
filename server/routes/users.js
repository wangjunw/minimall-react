const express = require('express');
const User = require('../models/user');
const router = express.Router();
router.get('/checkLogin', async (req, res) => {
    let uid = req.cookies.uid;
    if (!uid) {
        res.json({
            code: -1,
            message: '抓紧去登录了！'
        });
        return;
    }
    let user = await User.findOne({ uid });
    if (!user) {
        res.json({
            code: -1,
            message: '请问你哪位？'
        });
        return;
    }
    res.json({
        code: 0,
        message: 'login success',
        userInfo: {
            username: user.username,
            orders: user.orders,
            carts: user.carts
        }
    });
});
router.post('/login', async (req, res) => {
    let { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
        res.json({
            code: -1,
            message: '登录失败，请问你哪位？'
        });
        return;
    }
    if (password !== user.password) {
        res.json({
            code: -1,
            message: '密码都默认了你还错？'
        });
        return;
    }
    // 将用户登录状态存在cookie中
    res.cookie('uid', user.uid, { path: '/', maxAge: 1000 * 60 * 5 });
    // 存在session中
    // req.session.user = user;
    res.json({
        code: 0,
        message: 'login success',
        userInfo: {
            username: user.username,
            orders: user.orders,
            carts: user.carts
        }
    });
});
// 登出
router.post('/logout', (req, res) => {
    res.cookie('uid', '', { path: '/', maxAge: -1 });
    res.json({
        code: 0,
        message: 'logout success'
    });
});

module.exports = router;
