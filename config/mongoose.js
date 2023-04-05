const mongoose = require('mongoose')

// 僅在非正式環境時使用 dotenv
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

module.exports = db
