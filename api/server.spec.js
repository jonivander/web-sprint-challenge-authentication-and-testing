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


    describe('POST /login', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });

        it("should return status code 200 when loggin in a user successfully", () => {
            return supertest(server)
                .post("/api/auth/login")
                .send({
                    "username": "SprintTester2",
                    "password": "whatdoyouKNOW2"
                })
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });

        it("should fail with code 400 if passed incorrect data", () => {
            return supertest(server)
                .post("/api/auth/login")
                .send({})
                .then(res => {
                    expect(res.status).toBe(400);
                });
        });

        it("should login the user", async () => {
            const res = await supertest(server)
                .post("/api/auth/login")
                .send({
                    "username": "SprintSpirit",
                    "password": "testPassword"
                });

            expect(res.body.data.username).toBe("TestOneTwoThree");
        });
    });


    describe("GET /api/jokes", () => {
        it("should return HTTP status code 200", () => {
            return supertest(server)
                .get("/api/jokes")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });

        it("should return an api property with the value up", async () => {
            const res = await supertest(server).get("/api/jokes");

            expect(res.body.api).toBe("up");
        });
    });

});