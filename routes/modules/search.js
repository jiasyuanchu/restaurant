const express = require('express')
const router = express.Router()

//載入餐廳清單
const Restaurant = require('../../models/restaurant')


// search router
router.get('/', (req, res) => {

  // 依關鍵字篩選餐廳，若無則顯示無符合資料
  console.log(req.query.keyword)

  const keyword = req.query.keyword.trim();
  const sort = req.query.sort;

  //未選擇的話直接回傳初始頁面
  if (!keyword && sort === '1') {
    return res.redirect('/');
  }

  let option;

  switch (sort) {
    case '1':
      option = { name: 1 } //依照name升冪排列
      break;
    case '2':
      option = { name: -1 } //依照name降冪排列
      break;
    case '3':
      option = { category: 1 } //依照category升冪排列
      break;
    case '4':
      option = { location: 1 }//依照location升冪排列
      break;
  }

  Restaurant.find().sort(option).lean()
    .then(restaurants => {
      const filteredRestaurants = restaurants.filter(
        (item) => item.name.toLowerCase().includes(keyword.toLowerCase()));

      res.render('index', {
        restaurants: filteredRestaurants,
        keyword,
        currentSort: sort,
      });
    })
})


module.exports = router