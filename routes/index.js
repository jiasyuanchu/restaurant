const express = require('express')// 引用 Express 與 Express 路由器
const router = express.Router()// 準備引入路由模組

const home = require('./modules/home')// 引入 home 模組程式碼
const search = require('./modules/search')// 引入 home 模組程式碼
const restaurants = require('./modules/restaurants') // 載入 restaurant model
const users = require('./modules/users') 
const { authenticator } = require('../middleware/auth') // 掛載 middleware
const auth = require('./modules/auth')




router.use('/restaurants', authenticator, restaurants)  // 加入驗證程序
router.use('/users', users) 
router.use('/search', authenticator, search)// 將網址結構符合 / 字串的 request 導向 home 模組 // 加入驗證程序
router.use('/auth', auth)
router.use('/', authenticator, home) // 將網址結構符合 / 字串的 request 導向 home 模組 // 加入驗證程序


// 匯出路由器
module.exports = router
