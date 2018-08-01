const assert = require('assert');
const User = require('../src/user');

//describe is a function that takes two arguments, first is the string and second is the method
describe('Creating records', () => {

    it('saves a user', (done) => {
        //assertion is done inside it function
        const joe = new User({
            name: 'Joe'
        }); //create a User instance

        //save the instance in mondob
        //save is asynchronous
        joe.save() //Model has many build in functions, save is one of them
            .then(() => {
                //has joe saved successfully 
                //model instance has a property that tell that the instance is not stored into mongodb and is is memory for now
                assert(!joe.isNew);
                done();
            })
    });

});