let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('/Users/user/Desktop/seqeg/app.js');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Books', () => {
/*
  * Test the /GET route
  */
  describe('/GET rooms', () => {
      it('it should GET all the rooms', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('array');
                //res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/POST rooms', () => {
      it('it should update room status', (done) => {
        let room = {
            roomname: "mercury",
            sensor: 1
        }
        chai.request(server)
            .post('/postman')
            .send(room)
            .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('object');
                //res.body.should.have.property('errors');
                //res.body.errors.should.have.property('pages');
                //res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
      });

  });

});
