// app.js
// require packages used in the project
const express = require('express')
// require handlebars in the project
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose') // 載入 mongoose

// 僅在非正式環境時使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = 3000

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {
  console.log('here')
  require('dotenv').config()
}


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB


// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  //create a var to store restaurant
  res.render('index', { restaurants: restaurantList.results });
})

//搜尋功能
app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase();
  const restaurants = restaurantList.results.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(keyword) ||
      restaurant.category.includes(keyword)
  );

  if (restaurants.length) {
    //如果有搜尋結果，執行以下
    res.render("index", { restaurants: restaurants, keyword: keyword });
  } else {
    return
  }
});


//搜尋結果的route
app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase();
  const restaurants = restaurantList.results.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(keyword) ||
      restaurant.category.includes(keyword)
  );

  if (restaurants.length) {
    //如果有搜尋結果，執行以下
    res.render("index", { restaurants: restaurants, keyword: keyword });
  } else {
    return
  }
});


app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/popular/languages/:language', (req, res) => {
  console.log('request', req)
  res.send('<h1>Node.js is a popular language</h1>')
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
