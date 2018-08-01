//this will contaian only the schema of the post 
//that will be inserted into users as an array

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String
});

module.exports = PostSchema;