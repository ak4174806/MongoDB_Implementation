const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        alex = new User({
            name: 'Alex'
        });
        maria = new User({
            name: 'Maria'
        });
        zach = new User({
            name: 'Zach'
        });
        //joe has not been saved but it has an id property
        Promise.all([joe.save(), alex.save(), maria.save(), zach.save()])
            .then(() => done())
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

    it('can skip and limit result set', (done) => {
        User.find({})
            .sort({
                name: 1
            })
            .skip(1)
            .limit(2)
            .then((users) => {
                //console.log(users);
                assert(users.length === 2);
                assert(users[0].name === 'Joe');
                assert(users[1].name === 'Maria');
                done();
            })
    })

});