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

// 修改数量
router.post('/changeNum', async (req, res) => {
    let { productId, productNum } = req.body;
    let uid = req.cookies.uid;
    let user = await User.findOne({ uid });
    if (!user) {
        res.json({
            code: -1,
            message: 'who are you？'
        });
    }
    user.carts.forEach(item => {
        if (item.productId === productId) {
            item.productNum = productNum;
            return false;
        }
    });
    user.save();
    res.json({
        code: 0,
        message: 'success'
    });
});

// 删除接口（只有单一删除）
router.post('/delete', async (req, res) => {
    let uid = req.cookies.uid;
    let productId = req.body.productId;
    User.updateOne(
        { uid },
        {
            $pull: {
                carts: {
                    productId
                }
            }
        },
        err => {
            if (err) {
                res.json({
                    code: -1,
                    message: 'failed'
                });
                return;
            }
            res.json({
                code: 0,
                message: 'success'
            });
        }
    );
});
module.exports = router;
