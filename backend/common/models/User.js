const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const bcrypt = require('bcrypt');

const userSchema =new Schema({
    username:{type: String, required: true, trim:true},
    email:{type: String, required:true, unique:true, lowercase: true, trim:true},
    password:{type:String, required:true},
    verified:{type: Boolean, default: false},
    created_at:{type: Date, default: Date.now},
    //may be used for email verification and password reset(mufasa)
    resetToken: { type: String },
    resetTokenExpiry: { type: Date }
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
const User = model('User', userSchema);
module.exports = User;
