const express = require('express')
const db = require('../database')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/', (req, res) => {
  db.all('SELECT * FROM contacts', [], (err, rows) => {
    res.json(rows)
  })
})

router.get('/:id', auth, (req, res) => {
  db.get('SELECT * FROM contacts WHERE id=?', [req.params.id], (err, row) => {
    res.json(row)
  })
})

router.post('/', auth, (req, res) => {
  const { name, email, phone } = req.body
  db.run(
    'INSERT INTO contacts (name,email,phone) VALUES (?,?,?)',
    [name, email, phone],
    function () {
      res.json({ id: this.lastID })
    }
  )
})

router.put('/:id', auth, (req, res) => {
  const { name, email, phone } = req.body
  db.run(
    'UPDATE contacts SET name=?,email=?,phone=?,updated_at=CURRENT_TIMESTAMP WHERE id=?',
    [name, email, phone, req.params.id],
    () => res.sendStatus(200)
  )
})

router.delete('/:id', auth, (req, res) => {
  db.run('DELETE FROM contacts WHERE id=?', [req.params.id], () =>
    res.sendStatus(200)
  )
})

module.exports = router
