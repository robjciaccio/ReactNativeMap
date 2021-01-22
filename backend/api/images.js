const express = require('express')
const listingImage_Controller = require('../controllers/ListingImage_controller')
const fileUpload = require('../middleware/file-upload')

const imagesRouter = express.Router()

imagesRouter.get('/all', listingImage_Controller.getListingImages)

imagesRouter.post(
  '/new',
  fileUpload.single('image'),
  listingImage_Controller.uploadImages
)

module.exports = imagesRouter
