require('../models')
const request = require('supertest')
const app = require('../app')
const ProductImg = require('../models/ProductImg')
const Category = require('../models/Category')
const Product = require('../models/Product')


const BASE_URL = '/api/v1/products'
const BASE_URL_USERS = '/api/v1/users'
let TOKEN
let product
let productId
let image
let category

beforeAll(async ()=>{
    const body = {
        email: "vanessa@email.com",
        password: "vanessa1234" 
    }
    const res = await request(app)
    .post(`${BASE_URL_USERS}/login`)
    .send(body)

TOKEN = res.body.token

category = await Category.create({
    name:'Electronics'
})

 product ={
    title: 'Iphone 11',
    description: 'Apple phone with IOS software',
    price: '599',
    categoryId:category.id
}

})

afterAll(async()=> {
    await image.destroy(),
await category.destroy()})

test("Post->'BASE_URL' should return status 201 and res.body.title===product.title", async()=>{
 
    const res = await request(app)
    .post(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(product)

    productId= res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
})
test("Get-> 'BASE_URL' should return status 200 and res.body.length===1", async()=>{
    const res = await request(app)
    .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})
test("Get->'BASE_URL/:Id' should return status 200 and res.body.title===product.title", async()=>{
    const res =await request(app)
    .get(`${BASE_URL}/${productId}`)

    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
})
test("Put->'BASE_URL/:Id should return status 200 and res.body.title===updatedProduct.title", async()=>{

    const updatedProduct = {
        title: 'Iphone 12',
        description: 'Apple phone with IOS software',
        price: '599$'
    }
    const res = await request(app)
    .put(`${BASE_URL}/${productId}`)
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(updatedProduct)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(updatedProduct.title)
})

test("Post -> 'BASE_URL/:Id/product_images' should return status 200 and res.body.lenght ===1", async()=>{
    image = await ProductImg.create({
        url:'lorem.jpg',
        filename:'proof_or_image',
    })
console.log(image)
    const res = await request(app)
    .post(`${BASE_URL}/${productId}/images`)
    .set("Authorization", `Bearer ${TOKEN}`)
    .send([image.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

})
test("Delete->'BASE_URL/:Id' should return status 204", async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${productId}`)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
})
