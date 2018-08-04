const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');
const assert = require('assert');

describe('Associations', () => {
    let joe, blogPost, comment;
    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        blogPost = new BlogPost({
            title: 'JS is great',
            content: 'Yup, it really is!!'
        });
        comment = new Comment({
            content: 'Congrats on great post'
        });

        //associate the blogpost to blogposts of the joe
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        //combine all the promises and behaves as one promise
        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    //xit -> escapes that test, it.only -> run only that test
    //use modifiers to enhance the query
    it('saves a relation between user and blogpost', (done) => {
        User.findOne({
                name: 'Joe'
            })
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'JS is great')
                done();
            })
    });

    it('saves a full relation graph', (done) => {
        User.findOne({
                name: 'Joe'
            })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user', //name of the associated field
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name == 'Joe');
                assert(user.blogPosts[0].title === 'JS is great');
                assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                done();
            });
    });


});