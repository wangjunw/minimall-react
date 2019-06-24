const express = require('express');
const User = require('../models/user');
const router = express.Router();

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
    res.json({
        code: 0,
        message: 'login success',
        userInfo: {
            username: user.username,
            orders: user.orders,
            carts: user.carts,
            uid: user.uid
        }
    });
});

module.exports = router;
