const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        //joe has not been saved but it has an id property
        joe.save().then(() => done());
    });

    it('find all the users with name joe', (done) => {
        User.find({
                name: 'Joe'
            })
            .then((users) => {
                //console.log(user);
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            });
    });

    it('find user with a particular id', (done) => {
        User.find({
                _id: joe._id
            })
            .then((user) => {
                assert(user[0].name === 'Joe')
                done();
            });
    })
});