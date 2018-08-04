const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let joe;
    //insert one record after when test starts
    beforeEach((done) => {
        joe = new User({
            name: 'Joe',
            likes: 0
        });
        joe.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        //operation is a promise
        operation
            .then(() => User.find({})).then((users) => {
                //check whether there is only one user with name Joe singh
                assert(users.length === 1);
                assert(users[0].name === 'Joe Singh');
                done();
            });
    }

    //calling a model instance set and save
    it('instance type using set and save', (done) => {
        joe.set('name', 'Joe Singh');
        assertName(joe.save(), done);


    });

    //model instance update 
    it('A model can update', (done) => {
        assertName(joe.update({
            name: 'Joe Singh'
        }), done);
    });

    //class based updates

    it('Update through class', (done) => {
        assertName(User.update({
            name: 'Joe'
        }, {
            name: 'Joe Singh'
        }), done);

    });

    it('Model class update one records', (done) => {
        assertName(User.findOneAndUpdate({
            name: 'Joe'
        }, {
            name: 'Joe Singh'
        }), done);
    });

    it('Model class update by id', (done) => {
        assertName(User.findByIdAndUpdate(joe._id, {
            name: 'Joe Singh'
        }), done);
    });

    //xit -> means do not execute test
    it('Update users post count by 1', (done) => {
        User.update({
                name: 'Joe'
            }, {
                $inc: {
                    likes: 1
                }
            })
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user.likes === 1)
                done();
            })
    });

});