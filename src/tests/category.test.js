const request = require('supertest');
const app = require('../app');

let categoryId;
let  token;

beforeAll(async() =>{
    const credentials = {
        email: 'danieltest@email.com',
        password: 'danieltest1234'
    };
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('/POST /categories codigo 201 y id definido', async () => {
    const category = {
        name:'Tech'
    };
    const res = await request(app)
        .post('/categories')
        .send(category)
        .set('Authorization', `Bearer ${token}`);
    categoryId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('/GET /categories codigo 200 y largo de 1', async () => {
    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('/PUT /categories codigo 200 y que lo actualizado sea correspondiente', async () => {
    const categoryUpdated = {
        name:'Tech Updated'
    };
    const res = await request(app)
        .put(`/categories/${categoryId}`)
        .send(categoryUpdated)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(categoryUpdated.name);
});

test('/DELETE /categories/:id codigo 204', async () => {
    const res = await request(app)
        .delete(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});