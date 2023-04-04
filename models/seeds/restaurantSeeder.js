const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('../restaurant')// 載入 restaurant model
const restaurantList = require('../../restaurant.json')//載入現有餐廳資訊

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {
  console.log('here')
  require('dotenv').config()
}

// 僅在非正式環境時使用 dotenv
if (process.env.NODE_ENV !== 'production') {
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
  for (let i = 0; i < 10; i++) {
    Restaurant.create({ name: `name-${i}` })
  }
  console.log('done')
})
