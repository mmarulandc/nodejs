'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const { PORT = 3000 } = process.env

function hasOwnProperty (o, p) {
  return Object.prototype.hasOwnProperty.call(o, p);
}

function isParamsValid (o) {
  var valid = o !== null && typeof o === 'object';
  valid = valid && hasOwnProperty(o, 'un');
  valid = valid && typeof o.un === 'string';
  return valid;
}

function badRequest () {
  const err = new Error('Bad Request');
  err.status = 400;
  return err;
}

router.get('/', (req, res, next) => {
  // console.log(req.params.un)
  if(isParamsValid(req.query)) {
    setTimeout(() => {
      res.send((req.query.un || '').toUpperCase())
    }, 1000)
  } else {
    next(badRequest())
  }
})

app.use(router)

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`)
})