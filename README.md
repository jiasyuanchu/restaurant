# 我的餐廳清單

![](https://gcdnb.pbrd.co/images/H9TtNvgsTmyX.jpg?o=1)

## 介紹

##### 紀錄屬於自己的餐廳清單，可以瀏覽餐廳及查看詳細資訊。

## 功能

- 查看所有餐廳 
- 瀏覽餐廳的詳細資訊 
- 搜尋特定餐廳 
- 新增餐廳 
- 編輯餐廳 
- 刪除餐廳

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
7. 暫停使用
```javascript
ctrl + c
```


## 開發工具

- Node.js v18.13.0
- Express v4.16.4
- Express-Handlebars v4.0.3
- Bootstrap v5.1.3
- MongoDB
- mongoose 6.0.5