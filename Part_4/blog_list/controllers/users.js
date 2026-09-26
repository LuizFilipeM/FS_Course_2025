const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!password || password.length < 8) {
    return response.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres.' })
  }

  const haveUpperCase = /[A-Z]/.test(password)
  const haveLowerCase = /[a-z]/.test(password)
  const haveNumber = /\d/.test(password)
  const haveSpecialChar = /[@$!%*?&]/.test(password)

  if (!haveUpperCase || !haveLowerCase || !haveNumber || !haveSpecialChar) {
    return response.status(400).json({ error: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = usersRouter