const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
    uid: {
        type: String,
        unique: true
    },
    username: String,
    password: String,
    addresses: [
        {
            recipient: String,
            mobile: String,
            address: String,
            isDefault: Boolean
        }
    ],
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
            totalPrice: Number,
            status: Number
        }
    ]
});
module.exports = mongoose.model('User', userSchema);
