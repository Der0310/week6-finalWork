
require('../models')

const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')

const BASE_URL = '/api/v1/purchase'
const BASE_URL_USERS = '/api/v1/users'
const BASE_URL_CART = '/api/v1/cart'

let TOKEN
let product
let cart
let userId

beforeAll(async () => {
    const user = {
        email: "vanessa@email.com",
        password: "vanessa1234"
    }
    const res = await request(app)
        .post(`${BASE_URL_USERS}/login`)
        .send(user)
    TOKEN = res.body.token
    userId = res.body.user.id

    product = await Product.create({
        title: 'Iphone 11',
        description: 'Apple phone with IOS software',
        price: '599'
    });
   
    cart = {
        quantity: 1,
        productId: product.id,
    };
   
    await request(app)
        .post(BASE_URL_CART)
        .send(cart)
        .set('Authorization', `Bearer ${TOKEN}`)
      
});
afterAll(async () => {
    await product.destroy()

})

test("Post-> 'BASE_URL' should return status 201 and res.body.quantity===purchase.quantity", async () => {

    const res = await request(app)
        .post(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)
        
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body[0].quantity).toBe(cart.quantity)
})

test("Get-> 'BASE_URL' should return status 200 and res.body.length===1", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].userId).toBe(userId)
})