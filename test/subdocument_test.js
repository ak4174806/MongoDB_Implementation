const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {

    it('cam create a subdocumet', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{
                title: 'PostTitle'
            }]
        });
        joe.save()
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user.posts[0].title === 'PostTitle');
                done();
            })
    });

    it('adding new item in subdocumet', (done) => {
        const joe = new User({
            name: 'Joe'
        })
        joe.save()
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                //add a new record into subdocument
                user.posts.push({
                    title: 'New Post'
                });
                return user.save()
            })
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
            })
    });

    it('can remove a subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{
                title: 'ABC'
            }]
        });
        joe.save()
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                user.post[0].remove(); //remove directly into the subdocument
                return user.save();
            })
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            })
    })
});