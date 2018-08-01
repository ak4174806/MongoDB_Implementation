const assert = require('assert');
const User = require('../src/user');

describe('Validating a records based on certain criteria', () => {

    it('requires a userName', (done) => {
        const user = new User({
            name: undefined
        });
        const validationResult = user.validateSync();
        //according to es6 code when the variable name is same as the property then it can be retrieve as below
        const {
            message
        } = validationResult.errors.name;
        assert(message === 'Name is required');
        done();
    });

    it('user\'s name must be longer than 2 characters', (done) => {
        const user = new User({
            name: 'Al'
        });
        const validationResult = user.validateSync();
        const {
            message
        } = validationResult.errors.name;
        assert(message === 'Name must be longer than  2 characters.');
        done();
    });

    it('disallows invalid records from being saved', (done) => {
        const user = new User({
            name: 'Al'
        });
        user.save()
            .catch((validateResult) => {
                const {
                    message
                } = validateResult.errors.name;
                assert(message === 'Name must be longer than  2 characters.');
                done();
            });
    });


});