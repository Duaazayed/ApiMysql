const chai  = require('chai');
const expect = chai.expect;
const chaiHttp= require('chai-http');
chai.use(chaiHttp);

describe('Reservations API Service', function(){
    it('should GET all reservation', function(done){
        chai
        .request('http://localhost:5000')
        .get('/api/reservation')
        .end(function(err,resp){
            expect(resp.reservation_id).to.be.eql(8);
            expect(resp.reservation_date).to.be.eql('14:37:00');
            expect(resp.body).to.be.a('array');
            expect(resp.body.length).to.not.be.eql(0);
            done();
        });
    });
    it('should GET a single reservation', function(done){
        const expected=[
            {
            reservation_id: 8,
            
            reservation_date: '2022-04-30',
            reservation_start_time: '14:37:00',
            reservation_end_time:'15:37:00',
        },
    ];
    chai 
    .request('http://localhost:5000')
    .get('/api/reservation/1')
    .end(function(err, resp){
            expect(resp.username).to.be.eql('duaa');
            expect(resp.bike_id).to.be.eql(1);
            expect(resp.reservation_date).to.be.eql(200);
            expect(resp.body).to.be.a('array');
            expect(resp.body.length).to.not.be.eql(0);
            expect(resp.body).to.be.eql(expected);
            done();
    });
    });

it('should POST a single reservation', function(done){
    const newReservation ={
        name: 'New test Reservation',
    };
    const expected = { message: 'Add reservation succesfylly'};
    chai
    .request('http://localhost:5000')
    .post('/api/reservation')
    .send(newReservation)
    .end(function (err, resp){
        
        expect(resp.reservation_id).to.be.eql(1);
        expect(resp.reservation_date).to.be.eql('2022-04:30');
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        expect(resp.body).to.be.eql(expected);
        done();
});
});
});