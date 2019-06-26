const express = require('express');
const router = express.Router();
const Goods = require('../models/goods');
const User = require('../models/user');
router.get('/list', async (req, res, next) => {
    let { priceRange, sortWay, priceSort, pageSize, page } = req.query;
    let filter = {};
    if (priceRange !== 'All') {
        let arr = priceRange.split('-');
        let start = arr[0];
        let end = arr[1];
        filter = {
            productPrice: {
                $gt: start,
                $lte: end
            }
        };
    }
    // 分页
    let goodsModel = Goods.find(filter)
        .skip(page * pageSize)
        .limit(Number(pageSize));
    // 如果排序方式为价格，则根据升降序排列，1是升序
    if (sortWay === 'price') {
        goodsModel.sort({
            productPrice: priceSort === 'descending' ? -1 : 1
        });
    }
    goodsModel.exec((err, result) => {
        if (!result) {
            res.json({
                code: -1,
                message: '查询商品失败',
                err
            });
            return;
        }
        res.json({
            code: 0,
            message: 'success',
            data: result
        });
    });
});

// 添加购物车
router.post('/addCart', async (req, res) => {
    // 先判断当前用户
    let uid = req.cookies.uid;
    let user = await User.findOne({ uid });
    if (!user) {
        res.json({
            code: -1,
            message: 'who are you？'
        });
        return;
    }
    // 再判断商品
    let { productId } = req.body;
    let goodsItem = '';
    user.carts.forEach(item => {
        if (item.productId === productId) {
            goodsItem = item;
            // 注意要想修改productNum属性并保存，必须在schema中定义，否则不起作用
            item.productNum += 1;
            return false;
        }
    });
    if (!goodsItem) {
        let goods = await Goods.findOne({ productId });
        if (!goods) {
            res.json({
                code: -1,
                message: 'goods not found！'
            });
            return;
        }
        goodsItem = {
            productId: goods.productId,
            productPrice: goods.productPrice,
            productName: goods.productName,
            productImg: goods.productImg,
            productNum: 1
        };
        user.carts.push(goodsItem);
    }
    user.save();
    res.json({
        code: 0,
        message: 'success',
        cartsNum: user.carts.length
    });
});
module.exports = router;
