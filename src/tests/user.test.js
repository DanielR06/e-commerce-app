const request = require('supertest');
const app = require('../app');

let userId;
let  token;

test('/POST /users codigo 201 y id definido', async () => {
    const user = {
        firstName : 'Daniel',
        lastName: 'Rodriguez',
        email: 'daniel@email.com',
        password: 'daniel1234',
        phone: '09999999999'
    };
    const res = await request(app).post('/users').send(user);
    userId = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('/POST /users/login codigo 201 retorne token', async () => {
    const loggedUser = {
        email:"daniel@email.com",
        password:"daniel1234"
    }
    const res = await request(app).post('/users/login').send(loggedUser);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('/GET /users codigo 200 y largo de 1', async () => {
    const res = await request(app).get('/users').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('/PUT /users/:id codigo 200 y lo actualizado sea correspondiente', async () => {
    const userUpdated = {
        firstName: 'Daniel Updated'
    };
    const res = await request(app).put(`/users/${userId}`).send(userUpdated).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(userUpdated.firstName);
});


test('/POST /users/login validar que de error con credenciales invalidas', async () => {
    const loggedUser = {
        email:"danielBad@email.com",
        password:"danielBad1234"
    }
    const res = await request(app).post('/users/login').send(loggedUser);
    expect(res.status).toBe(401);
});

test('/DELETE /users/:id codigo 204', async () => {
    const res = await request(app).delete(`/users/${userId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});