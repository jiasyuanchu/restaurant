
const express = require('express')// 引用 Express 與 Express 路由器
const router = express.Router()

const Restaurant = require('../../models/restaurant') // 載入 restaurant model

// add a new restaurant
router.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// receive the results and transfer results to database
router.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(thisNewRestaurant => {
      res.render('detail', { thisNewRestaurant });
    })
    .catch(err => console.log(err))
    });

// direct to specific details
router.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// direct to editing page
router.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// receive editing results and transfer results to database
router.put('/restaurants/:id', (req, res) => {
  //use the object assign 
  const { id } = req.params
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))

  // const id = req.params.id
  // const data = req.body
  // // modify restaurant, and save to data
  // return Restaurant.findById(id)
  //   .then(restaurant => {
  //     restaurant.name = data.name,
  //     restaurant.name_en = data.name_en,
  //     restaurant.category = data.category,
  //     restaurant.image = data.image,
  //     restaurant.location = data.location,
  //     restaurant.phone = data.phone,
  //     restaurant.google_map = data.google_map,
  //     restaurant.rating = data.rating,
  //     restaurant.description = data.description,
  //     restaurant.save()
  //   })
  //   .then(() => {
  //     res.redirect(`/restaurants/${id}/`)
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
})

// delete function
router.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/restaurants/:restaurant_id', (req, res) => {
  const { restaurant_id } = req.params
  //search in "restaurant"(in db) by ID
  Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(err => console.log(err))
})

// 匯出路由模組
module.exports = router
