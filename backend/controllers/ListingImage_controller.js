const express = 'express'
const multer = require('multer')
const bodyParser = require('body-parser')

const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mapapp',
  password: "''''",
  port: 5432,
})

const getListingImages = async (req, res, next) => {
  await pool.query('SELECT * FROM images', (err, results) => {
    if (err) {
      console.log(err)
    }
    res.status(200).json(results.rows)
  })
}

const uploadImages = async (req, res, next) => {
  const { listing_id, image_uri } = req.body

  try {
    await pool.query(
      'INSERT INTO images (listing_id, image) VALUES ($1, $2) RETURNING *',
      [listing_id, image_uri],
      (err, result) => {
        if (!result) {
          res.status(500).json({ msg: err })
        }
        res.status(201).json(result.rows)
      }
    )
  } catch (error) {
    console.log(error)
  }
}

exports.getListingImages = getListingImages
exports.uploadImages = uploadImages
