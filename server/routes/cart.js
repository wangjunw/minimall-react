const express = require('express');
const router = express.Router();
const User = require('../models/user');
router.get('/list', async (req, res) => {
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
        data: user.carts,
        message: 'success'
    });
});
module.exports = router;
