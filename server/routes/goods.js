const express = require('express');
const router = express.Router();
const Goods = require('../models/goods');
router.get('/goods', async (req, res, next) => {
    let result = await Goods.find();
    if (!result) {
        res.json({
            code: -1,
            message: '查询商品失败'
        });
        return;
    }
    res.json({
        code: 0,
        message: 'success',
        data: result
    });
});
module.exports = router;
