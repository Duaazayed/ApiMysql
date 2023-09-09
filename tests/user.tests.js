const chai  = require('chai');
const expect = chai.expect;
const chaiHttp= require('chai-http');

chai.use(chaiHttp);
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjUxMzQ4MDAyLCJleHAiOjE2NTE0MzQ0MDJ9.lPJDwaafxecHuqYWrZvCfbkHaBVbOFUnpDpdlY7ZInk';

describe('User API Service', ()=>{
    it("should GET a logged in user's unique id, username, and password", (done)=>{
        const expected=[{
            user_id: 8,
            username: 'evan',
            email: 'evan@test.com'
        },
    ];
        
    
        chai
        .request('http://localhost:5000')
        .get('/api/user/me')
        .set('Authorization', `Bearer ${token}`)
        .end((err,resp)=>{
            expect(resp.body).to.eql(expected);
            done();
        });
    });
    it.skip('should PUT update credentials for a logged in user', (done)=>{
        const updatedUser={
            username: 'evan',
            password:'newPassword',
            email:' evan@test.com',
        };
        const expected={msg: 'Updated succesfully'};

        chai
        .request('http://localhost:5000')
        .put('/api/user/me/update')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedUser)
        .end((err,resp)=>{
            expect(resp.body).to.eql(expected);
            done();
    });
});
it('should PUT updated credentials for a logged in user', (done)=>{
    const updatedUser={
        username: 'evan',
        password:'newPassword',
        email:' evan@test.com',
    };
    const expected={msg: 'Nothing to update '};
     chai
        .request('http://localhost:5000')
        .put('/api/user/me/update')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedUser)
        .end((err,resp)=>{
            expect(resp.body).to.eql(expected);
            done();
    });
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
    });
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
*/