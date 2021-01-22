const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')

const listings_controller = require('../controllers/Listings_controller')

const listingsRouter = express.Router()

listingsRouter.get('/', listings_controller.getListings)

listingsRouter.post('/new', listings_controller.createListing)

module.exports = listingsRouter
