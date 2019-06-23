const express = require('express');
const router = express.Router();
const Goods = require('../models/goods');
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
module.exports = router;
