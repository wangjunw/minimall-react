const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
    uid: {
        type: String,
        unique: true
    },
    username: String,
    password: String,
    carts: Array,
    orders: Array
});
module.exports = mongoose.model('User', userSchema);
