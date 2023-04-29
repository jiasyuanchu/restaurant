if (process.env.DOT_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const User = require('../user')
const Restaurant = require('../restaurant')
const bcrypt = require('bcryptjs')

// 種子資料
const restaurantList = require('../../restaurant.json').results
const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantList: [1, 2, 3]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantList: [4, 5, 6]
  },
]

db.once('open', async () => {
  return Promise.all(
    SEED_USER.map(async (user) => {
      try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        const createdUser = await User.create({
          name: user.name,
          email: user.email,
          password: hash
        })
        const userRestaurants = user.restaurantList.map(index => {
          const restaurant = restaurantList[index]
          restaurant.userId = createdUser._id
          return restaurant
        })
        await Restaurant.create(userRestaurants)
      } catch (err) {
        console.log(err)
      }
    })
  )
    .then(() => {
      console.log('seeder done.')
      process.exit()
    })
    .catch(err => {
      console.log(err)
    })
})