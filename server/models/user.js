const mongoose = require('mongoose');

//create user schema...

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        required: false
    },
    id: { type: String }
}, { timestamps: true });



//now create model and export...

module.exports = mongoose.model('User', userSchema)