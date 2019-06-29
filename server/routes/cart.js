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

// 创建订单接口
router.post('/createOrder', async (req, res) => {
    let uid = req.cookies.uid;
    let { totalPrice, goodsList } = req.body;
    let goodsListObj = JSON.parse(goodsList);
    let user = await User.findOne({ uid });
    if (!user) {
        res.json({
            code: -1,
            message: 'who are you？'
        });
    }
    let createTime = new Date().getTime(),
        orderId = uid + createTime;
    user.save();
    // 订单创建成功之后，把购物车里商品删除
    user.orders.push({
        orderId,
        totalPrice,
        createTime,
        goodsList: goodsListObj,
        status: 0
    });
    for (let i of goodsListObj) {
        for (let j of user.carts) {
            if (i.productId === j.productId) {
                User.updateOne(
                    { uid },
                    {
                        $pull: {
                            carts: {
                                productId: i.productId
                            }
                        }
                    },
                    err => {
                        res.json({
                            code: -1,
                            message: err
                        });
                        return;
                    }
                );
            }
        }
    }
    let resentUser = await User.findOne({ uid });
    res.json({
        code: 0,
        message: 'create success！',
        orderId,
        cartNum: resentUser.carts.length
    });
});
module.exports = router;
