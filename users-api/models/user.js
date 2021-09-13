const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
//validator is a plugin that will add an extra hook that checks your data 
//before it saves it to the database

const userSchema = mongoose.Schema({
    email: {type: String, required: true , unique: true},
    password: {type: String, require: true}
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);