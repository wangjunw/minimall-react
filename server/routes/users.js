const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/login', (req, res) => {
    res.json({
        code: -1,
        message: '登录失败！'
    });
});

module.exports = router;
