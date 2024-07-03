require('../models')
const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')

const BASE_URL = '/api/v1/cart'
const BASE_URL_USERS = '/api/v1/users'

let TOKEN
let CartId
let product
let userId
let cart

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
        price: '599$'
    })
   
})


afterAll(async () => {
    await product.destroy()

})


test("Post-> 'BASE_URL' should return status 201 and res.body.quantity===cart.quantity", async () => {
    cart = {
        quantity: 2,
        productId: product.id
    }
    const res = await request(app)
        .post(BASE_URL)
        .send(cart)
        .set('Authorization', `Bearer ${TOKEN}`)
    
    CartId = res.body.id
    console.log(res.body)

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)
    expect(res.body.userId).toBe(userId)
})

test("Get->'BASE_URL' should return status 200 and res.body.length===1", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)

})
test("Get->'BASE_URL/:id' should return status 200 and res.body.quantity===cart.quantity", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${CartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)
})

test("Put->'BASE_URL/:id' should return status 200 and res.body.quantity===updatedCart.quantity", async () => {
    const updatedCart = {
        quantity: 3
    }
    const res = await request(app)
        .put(`${BASE_URL}/${CartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(updatedCart)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(updatedCart.quantity)
})

test("Delete->'BASE_URL/:Id' should return status 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${CartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
})
