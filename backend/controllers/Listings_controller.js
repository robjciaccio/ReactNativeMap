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

const getListings = async (req, res, next) => {
  await pool.query('SELECT * FROM listings', (err, results) => {
    if (err) {
      console.log('listings controller line 18')
    }
    res.status(200).json(results.rows)
  })
}

const createListing = async (req, res, next) => {
  const {
    latitude,
    longitude,
    neighborhood,
    address,
    apt,
    beds,
    baths,
    price,
    user_id,
  } = req.body
  try {
    await pool.query(
      'INSERT INTO listings (latitude, longitude, neighborhood, address, apt, beds, baths, price, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        latitude,
        longitude,
        neighborhood,
        address,
        apt,
        beds,
        baths,
        price,
        user_id,
      ],
      (err, result) => {
        console.log(result)
        if (!result) {
          newError = 'listing didnt work'
          res.status(500).json({ msg: err })
          next()
        }
        res.status(201).json(result.rows)

        next()
      }
    )
  } catch (error) {
    console.log(error)
  }
}

exports.getListings = getListings
exports.createListing = createListing
