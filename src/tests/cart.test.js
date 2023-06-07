const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
require('../models');

let cartId;
let  token;

beforeAll(async() =>{
    const credentials = {
        email: 'danieltest@email.com',
        password: 'danieltest1234'
    };
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('/POST /carts codigo 201 y id definido', async () => {
    const product = await Product.create({
        title:'Laptop 15 pulgadas',
        description:'Laptop Dell Inspirion 3572',
        brand:'Dell',
        price:400,

    });
    const cart = {
        quantity: 5,
        productId: product.id
    };
    const res = await request(app)
        .post('/carts')
        .send(cart)
        .set('Authorization', `Bearer ${token}`);
    await product.destroy();
    cartId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('/GET /carts codigo 200 y largo de 1', async () => {
    const res = await request(app)
    .get('/carts')
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('/PUT /carts codigo 200 y que lo actualizado sea correspondiente', async () => {
    const cartUpdated = {
        quantity: 1
    };
    const res = await request(app)
        .put(`/carts/${cartId}`)
        .send(cartUpdated)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(cartUpdated.quantity);
});

test('/DELETE /carts:id codigo 204', async () => {
    const res = await request(app)
        .delete(`/carts/${cartId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});