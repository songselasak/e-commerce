const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },

    password: {
        type: Number,
        required: true
    },

    admin: {
        type: Boolean,
        required: true
    }
});

userSchema.methods.createUser = function(user) {
    let users = new User({
        username: user.username,
        email: user.email,
        password: user.password,
        admin: user.admin
    })
    users.save();
}

module.exports = mongoose.model('User', userSchema);