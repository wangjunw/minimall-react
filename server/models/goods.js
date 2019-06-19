var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goodsSchema = new Schema({
    productId: String,
    productName: String,
    productPrice: String,
    productImg: String
});
module.exports = mongoose.model('Goods', goodsSchema);
