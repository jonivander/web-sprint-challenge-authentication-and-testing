const supertest = require('supertest');

const server = require('./server');
const db = require('../database/dbConfig');

// const { intersect } = require('../database/dbConfig');
// const { expectCt } = require('helmet');

describe('server', () => {
    describe('POST /register', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });

        it("should return status code 201 when adding a user successfully", () => {
            return supertest(server)
                .post("/api/auth/register")
                .send({
                    "username": "SprintTester2",
                    "password": "whatdoyouKNOW2"
                })
                .then(res => {
                    expect(res.status).toBe(201);
                });
        });

        it("should fail with code 400 if passed incorrect data", () => {
            return supertest(server)
                .post("/api/auth/register")
                .send({})
                .then(res => {
                    expect(res.status).toBe(400);
                });
        });

        it("should register/insert the user into the database", async () => {
            const res = await supertest(server)
                .post("/api/auth/register")
                .send({ 
                    "username": "TestOneTwoThree", 
                    "password": "PassWordTwoThree" 
                });

            expect(res.body.data.username).toBe("TestOneTwoThree");
        });
    });


});