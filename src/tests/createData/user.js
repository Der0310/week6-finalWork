const User = require("../../models/User")

const user = async () => {
  const body = {
    firstName: "Vanessa",
    lastName: "Garro",
    email:"vanessa@email.com",
    password:"vanessa1234",
    phone: "9999-5555"
  }

  await User.create(body)
}

module.exports = user

