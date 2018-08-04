//virtual types is the additional column that is calculate at the node side but not stored into db
//virtual types are defined in Schema

const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {

    it('postcount returns number of posts', (done) => {
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
                assert(joe.postCount === 1)
                done();
            })
    });
});