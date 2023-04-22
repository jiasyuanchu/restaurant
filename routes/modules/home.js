// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant') // 載入 restaurant model

// 定義首頁路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'asc' }) // desc
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// 搜尋功能
router.get('/search', (req, res) => {
  const sort = req.query.sort;
  console.log(sort);
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filteredRestaurants = restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.category.includes(keyword)
      )

      if (filteredRestaurants.length) {
        // 如果有搜尋結果，執行以下
        res.render('index', { restaurants: filteredRestaurants, keyword })
      } else {
        res.render('index', { keyword, errorMsg: `您搜尋的關鍵字：${keyword}，沒有符合條件的餐廳` })
      }
    })
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router
