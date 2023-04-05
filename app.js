// app.js
// require packages used in the project
const express = require('express')
const mongoose = require('mongoose') 
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant') // 載入 restaurant model

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

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

//add a new restaurant 
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

//receive the results and transfer results to database
app.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

//direct to specific details
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

//direct to editing page
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//receive editing results and transfer results to database
app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const data = req.body
  // modify restaurant, and save to data
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = data.name,
        restaurant.name_en = data.name_en,
        restaurant.category = data.category,
        restaurant.image = data.image,
        restaurant.location = data.location,
        restaurant.phone = data.phone,
        restaurant.google_map = data.google_map,
        restaurant.rating = data.rating,
        restaurant.description = data.description,
        restaurant.save()
    })
    .then(() => {
      res.redirect(`/restaurants/${id}/`)
    })
    .catch(error => {
      console.log(error)
    })

})

//delete function
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
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
