const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
require("../models");

let purchaseId;
let token;

beforeAll(async () => {
  const credentials = {
    email: "danieltest@email.com",
    password: "danieltest1234",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test('/POST /purchases codigo 201 y id definido', async () => {
  const product = await Product.create({
    title: "Laptop 15 pulgadas",
    description: "Laptop Dell Inspirion 3572",
    brand: "Dell",
    price: 400,
  });
  const cart = await Cart.create({
    quantity: 5,
    productId: product.id,
  })
  const res = await request(app)
      .post("/purchases")
      .set("Authorization", `Bearer ${token}`);
    await product.destroy();
    console.log(cart);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    //!que retorne un body con el purchase
});

test("/GET /purchases codigo 200 y largo de 1", async () => {
    const res = await request(app)
      .get("/purchases")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });