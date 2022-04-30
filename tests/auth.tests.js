require('mocha');
const chai  = require('chai');
const expect = chai.expect;
const chaiHttp= require('chai-http');

chai.use(chaiHttp);

describe('Auth API Service', function(){
    it('should POST a new user', function(done){
        const testUser={
            username: 'duaa',
            password: '1234',
            email: 'duaa@example.com'
        };
        const expectedUser =
        {
            username: 'duaa',
            email: 'duaa.@example.com'
        };
    
        chai
        .request('http://localhost:5000')
        .post('/api/auth/register')
        .send(testUser)
        .end(function(err,resp){
            console.log(resp.body);
            expect(resp.body.username).to.eql(expectedUser.username);
            expect(resp.body.email).to.eql(expectedUser.email);
            done();
        });
    });
   /* it('should not POST new user if no username, email or password is given ', function(done){
        const expected={
             msg: 'Password cannot be empty',
            };
   
    chai 
    .request('http://localhost:5000')
    .post('/api/auth/register')
    .end(function(err, resp){
            expect(resp.body).to.eql(expected);
            done();
    });
    });*/
    it('should POST a login for an existing', (done)=>{
        const testUser ={
            username:'duaa',
            password:'1234',
            email: 'duaa@example.com',
        };
        chai
            .request('http://localhost:5000')
            .post('/api/auth/login')
            .send(testUser)
            .end((err, resp) =>{
              expect(resp.body.auth).to.be.true;
              expect(resp.body.expires_in).to.be.eql(86400);
              expect(resp.body.access_token).to.be.a('string');
              expect(resp.body.refresh_token).to.be.a('string');
              done();
    });
});
});
