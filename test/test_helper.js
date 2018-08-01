const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //use ES6 implementation for promises. We do have bluebird and q that can also be used


//run test only when mongo is connected. It can happen that test are runned before connecting to mongo, to avoid this we use this line Before
before((done) => {
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
        .once('open', () => {
            done();
        })
        .on('error', (error) => {
            console.warn('Warning', error);
        });

});

//hook to delete all the records in the collection before running a test
beforeEach((done) => {
    //above takes time to update , so stop till its completed
    mongoose.connection.collections.users.drop(() => {
        //ready to run the next test
        done();
    });

});