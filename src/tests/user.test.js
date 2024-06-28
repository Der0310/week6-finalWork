const request = require('supertest')
const app = require('../app')


const BASE_URL = '/api/v1/users'

let userId
let TOKEN

beforeAll(async () => {
    const body = {
        email:"vanessa@email.com",
        password:"vanessa1234"
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(body)

TOKEN = res.body.token

  
})
 //// credenciales con loq e se hizo log, ESTO ES PARA OBTENER EL TOKEN PARA LOS ENDPOINTS PRIVADOS
test("Post-> 'BASE_URL' should return status 201 and res.body.firstName===user1.firstName", async () => {
    const user = {
        firstName: 'Pablo',
        lastName: 'Rojas',
        email: 'pablo@gmail.com',
        password: 'pablo1234',
        phone: '8855-5599'
    }

    const res = await request(app)
        .post(BASE_URL)
        .send(user)

        userId= res.body.id


    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})


test("Get->'BASE_URL' should return status 200 and res.body.length.firstName===2", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

       // console.log(res.body)
      

    expect(res.status).toBe(200)
    expect(res.body.length).toBe(2)
})

test("Put-> 'BASE_URL/:Id' should return status 200 and res.body.firstName===updatedUser.firstName", async()=>{
    const updatedUser = {
        firstName: 'Pablito'
    }
    
    const res = await request(app)
    .put(`${BASE_URL}/${userId}`)
    .send(updatedUser)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(updatedUser.firstName)

    
})

test("Post-> 'BASE_URL/login', should return status 401", async()=>{
    const body = {
        email: 'pablo@gmail.com',
        password: 'invalid password'
    }

    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(body)

    expect(res.status).toBe(401)
})

test("Post->'BASE_URL/login', should return status 200, res.body.user and res.body.token to be defined, and res.body.user.email===body.email",async()=>{
    const body ={
         email: 'pablo@gmail.com',
        password: 'pablo1234'
    }

    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(body)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user).toBeDefined()
    expect(res.body.token).toBeDefined()
    expect(res.body.user.email).toBe(body.email)
})


test("Delete-> 'BASE_URL/:Id' should return status 204",async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${userId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
})