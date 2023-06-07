const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');
require('../models')

let productId;
let  token;

beforeAll(async() =>{
    const credentials = {
        email: 'danieltest@email.com',
        password: 'danieltest1234'
    };
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('/POST /products codigo 201 y id definido', async () => {
    const category = await Category.create({ name: 'tech'});
    const product = {
        title:"Smartphone",
        description:"Galaxy S20",
        brand:"Samsung",
        price:200,
        categoryId: category.id
    };
    const res = await request(app)
        .post('/products')
        .send(product)
        .set('Authorization', `Bearer ${token}`);
    productId = res.body.id;
    await category.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('/GET /products codigo 200 y largo de 1', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('/POST /products/:id/images', async () => {
    const image = await ProductImg.create({
        url:'http://false.url.com',
        publicId: 'false id'
    });
    const res = await request(app)
        .post(`/products/${productId}/images`)
        .send([image.id])
        .set('Authorization', `Bearer ${token}`);
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('/PUT /products/:id codigo 200 y lo actualizado sea correspondiente', async () => {
    const productUpdated = {
        brand: 'Samsung Updated'
    }
    const res = await request(app)
        .put(`/products/${productId}`)
        .send(productUpdated)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.brand).toBe(productUpdated.brand);
});


test('/DELETE /products:id codigo 204', async () => {
    const res = await request(app)
        .delete(`/products/${productId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});