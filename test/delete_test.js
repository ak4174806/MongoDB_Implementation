const assert = require('assert');
const User = require('../src/user');

describe('Deleting a record from user', () => {

    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        joe.save().then(() => done());
    });

    it('model instance remove', (done) => {
        joe.remove().then(() => User.findOne({
            name: 'Joe'
        }).then((user) => {
            assert(user === null);
            done();
        }));
    });

    it('class method remove', (done) => {
        //Remove multiple records
        User.remove({
                name: 'Joe'
            })
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user === null);
                done();
            })
    });

    it('class method findAndRemove', (done) => {
        User.findOneAndRemove({
                name: 'Joe'
            })
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user === null)
                done();
            })
    });

    it('class method findByIdRemove', (done) => {
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user === null)
                done();
            })
    });
});