const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = require('./postSchema');

//subdocumen-post
//document-user
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than  2 characters.'
        }
    },
    postCount: Number,
    posts: [postSchema] //array containing posts

});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;