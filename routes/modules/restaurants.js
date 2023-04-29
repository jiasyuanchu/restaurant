
const express = require('express')// 引用 Express 與 Express 路由器
const router = express.Router()

const Restaurant = require('../../models/restaurant') // 載入 restaurant model

// add a new restaurant
router.get('/new', (req, res) => {
  return res.render('new')
})

// receive the results and transfer results to database
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(thisNewRestaurant => {
      res.render('detail', { thisNewRestaurant });
    })
    .catch(err => console.log(err))
    });

// direct to specific details
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})
// direct to editing page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
// receive editing results and transfer results to database
router.put('/:id', (req, res) => {
  //use the object assign 
  const userId = req.user._id
  const _id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  // const { id } = req.params
  Restaurant.findByIdAndUpdate(_id, req.body)
    .then(() => res.redirect(`/restaurants/${_id}`))
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
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const restaurant_id = req.params.restaurant_id
  //search in "restaurant"(in db) by ID
  Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(err => console.log(err))
})

// 匯出路由模組
module.exports = router
