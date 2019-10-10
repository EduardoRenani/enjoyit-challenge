//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Partner = require('../src/models/Partner');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "localhost:/3000";
let should = chai.should();

chai.use(chaiHttp);

describe('Partners', () => {
    beforeEach((done) => { //Before each test we empty the database
        Partner.remove({}, (err) => { 
           done();           
        });        
    });
    /*
    * Test the /GET route
    */
    describe('/GET partners', () => {
        it('it should GET all partners', (done) => {
            chai.request(server)
                .get('/partners')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
                });
        });
    });

});