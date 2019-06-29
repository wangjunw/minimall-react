const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
    uid: {
        type: String,
        unique: true
    },
    username: String,
    password: String,
    carts: [
        {
            productId: String,
            productPrice: String,
            productName: String,
            productImg: String,
            productNum: Number
        }
    ],
    orders: [
        {
            orderId: String,
            goodsList: Array,
            createTime: String,
            totalPrice: Number
        }
    ]
});
module.exports = mongoose.model('User', userSchema);
