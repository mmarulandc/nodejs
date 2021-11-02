'use strict'

const got = require('got')

const {
  BOAT_SERVICE = 4000, BRAND_SERVICE = 5000
} = process.env

const boatSrv = `http://localhost:${BOAT_SERVICE}`
const brandSrv = `http://localhost:${BRAND_SERVICE}`

module.exports = async function (fastify, opts) {
  const { httpErrors } = fastify
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      const boat = await got(`${boatSrv}/${id}`).json();
      const boatBrand = boat.brand;
      const brand = await got(`${brandSrv}/${boatBrand}`).json()
      // const [ boat, brand ] = await Promise.all([
      //   got(`${boatSrv}/${id}`).json(),
      //   got(`${brandSrv}/${id}`).json()
      // ])
      return {
        id: boat.id,
        color: boat.color,
        brand: brand.name,
      }
    } catch (err) {
      if (!err.response) throw err
      if (err.response.statusCode === 404) {
        throw httpErrors.notFound()
      }
      if (err.response.statusCode === 400) {
        throw httpErrors.badRequest()
      }
      throw err
    }
  })
}