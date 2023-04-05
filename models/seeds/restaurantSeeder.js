const db = require('../../config/mongoose')

const Restaurant = require('../restaurant')// 載入 restaurant model
const restaurantList = require("../../restaurant.json").results


// 連線成功
db.once("open", () => {
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!")
      db.close()
    })
    .catch(err => console.log(err))
})
