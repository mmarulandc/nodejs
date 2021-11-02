'use strict'
const { Router } = require('express')
const data = require('../data')
const router = Router()


router.get('/', async (req, res) => {
  res.send(await data())
})

module.exports = router