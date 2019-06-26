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
    orders: Array
});
module.exports = mongoose.model('User', userSchema);
