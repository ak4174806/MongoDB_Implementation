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
    posts: [postSchema], //array containing posts,same as blogPosts, written before testing blogPosts
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]

});

//define virtual field that is not saved into db
//get into virtual makes it a function that runs when it is accessed
userSchema.virtual('postCount').get(function () {
    return this.posts.length;
})

userSchema.pre('remove', function (next) {
    //this==User instance
    //remove all the related blogpost to user
    const BlogPost = mongoose.model('blogPost');
    BlogPost.remove({
            _id: {
                $in: this.blogPosts
            }
        })
        .then(() => next());
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;