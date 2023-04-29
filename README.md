# 我的餐廳清單

![](https://gcdnb.pbrd.co/images/H9TtNvgsTmyX.jpg?o=1)

## 介紹

##### 紀錄屬於自己的餐廳清單，使用者可以登入自己的帳戶，瀏覽餐廳、新增及查看最愛的餐廳詳細資訊。

## 功能

- 查看所有餐廳 
- 瀏覽餐廳的詳細資訊 
- 搜尋特定餐廳 
- 新增餐廳 
- 編輯餐廳 
- 刪除餐廳
- 依照不同方式排序餐廳
- 註冊帳號，登入，登出
- 可以用 Facebook Login

## 開始使用 

1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：
```javascript
npm install
```
4. 安裝完畢後，設定環境變數連線 MongoDB
```javascript
MONGODB_URI=mongodb+srv://<Your MongoDB Account>:<Your MongoDB Password>@cluster0.xxxx.xxxx.net/<Your MongoDB Table><?retryWrites=true&w=majority
```
5. 繼續輸入：
```javascript
npm run start
```
6. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址
```javascript
Listening on http://localhost:3000
```

7. 製作種子資料 (會做出2個dummy帳號，裡面各有3筆dummy data)
```javascript
npm run seed
```

8. 暫停使用
```javascript
ctrl + c
```

9. 製作 .env檔案，可以參考 .env.example


## 開發工具

- Node.js v18.13.0
- Express v4.16.4
- Express-Handlebars v4.0.3
- Bootstrap v5.1.3
- MongoDB
- mongoose 6.0.5
- bcryptjs": "^2.4.3",
- connect-flash": "^0.1.1",
- express-session": "^1.17.3",
- method-override": "^3.0.0",
- passport": "^0.6.0",
- passport-facebook": "^3.0.0",
- passport-local": "^1.0.0"