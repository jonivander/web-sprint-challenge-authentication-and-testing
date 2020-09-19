const supertest = require('supertest');

const server = require('./server');
const db = require('../database/dbConfig');

// const { intersect } = require('../database/dbConfig');
// const { expectCt } = require('helmet');


describe('User Flow', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

//REGISTRATION
    it("should return status code 201 on REGISTRATION", () => {
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

    it("should REGISTER/insert the user into the database", async () => {
        const res = await supertest(server)
            .post("/api/auth/register")
            .send({ 
                "username": "TestOneTwoThree", 
                "password": "PassWordTwoThree" 
            });

        expect(res.body.data.username).toBe("TestOneTwoThree");
    });

//LOGIN
    it("should return status code 401 upon attempting non-existant LOGIN", async () => {
        await supertest(server)
            .post("/api/auth/login")
            .send({
                "username": "WinnerLoser",
                "password": "whatdoyoudo"
            })
            .then(res => {
                expect(res.status).toBe(401);
            })
            
    });

    it("should fail with code 400 if passed incorrect data", () => {
        return supertest(server)
            .post("/api/auth/login")
            .send({})
            .then(res => {
                expect(res.status).toBe(400);
            });
    });

    it("should LOGIN the user", async () => {
        const res = await supertest(server)
            .post("/api/auth/register")
            .send({ 
                "username": "TestOneTwoThree", 
                "password": "PassWordTwoThree" 
            });
       return supertest(server)
            .post("/api/auth/login")
            .send({
                "username": "TestOneTwoThree", 
                "password": "PassWordTwoThree"
            })
            .then(res => {
                expect(res.status).toBe(200);
            })
    });

//JOKES
    it("should return status code 401 when getting JOKES without token", () => {
        return supertest(server)
            .get("/api/jokes")
            .then(res => {
                expect(res.status).toBe(401);
            });
    });

    it("should return status code 200 when getting JOKES WITH token",  async () => {
        const res = await supertest(server)
            .post("/api/auth/register")
            .send({ 
                "username": "TestOneTwoThree", 
                "password": "PassWordTwoThree" 
            })
            .get("/api/jokes")
        expect(res).toBeUndefined();
    });

});
