const request = require('supertest')
const app = require('../app')


const BASE_URL = '/api/v1/categories'
const BASE_URL_USERS = '/api/v1/users'// ojo esto para el login 

let TOKEN
let categoryId

beforeAll(async () => {
    const body = {
        email: "vanessa@email.com",
        password: "vanessa1234"
    }

    const res = await request(app)
        .post(`${BASE_URL_USERS}/login`)
        .send(body)

TOKEN = res.body.token
})

test("Post-> 'BASE_URL' should return status 201 and res.body.name=== category.name", async () => {
    const category = {
        name: "Salsa"
    }
    const res = await request(app)
        .post(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(category)

    categoryId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
})

test("Get -> 'BASE_URL', should return status code 200, and res.body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL) 

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test('Delete => BASE_URL/:id should return status 204', async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${categoryId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
})