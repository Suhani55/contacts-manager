const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../database')

const router = express.Router()

router.post('/login', (req, res) => {
  const { email, password } = req.body
  db.get('SELECT * FROM users WHERE email=?', [email], async (err, user) => {
    if (!user) return res.sendStatus(401)
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.sendStatus(401)
    const token = jwt.sign({ id: user.id }, 'secret')
    res.json({ token })
  })
})

module.exports = router
