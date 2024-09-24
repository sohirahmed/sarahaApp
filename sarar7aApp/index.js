const express = require('express')
const path = require('path')
const {connectionDB} = require('./db/connectionDB.js')
const userRouter = require('./src/modules/user/user.routes.js')
const app = express()
const port = 3000
var  session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session)


app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

var store = new MongoDBStore({
    uri:"mongodb://localhost:27017/sara7aApp",
    collection:'my session'
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
}))

app.use(userRouter)

connectionDB()
app.use('*', (req, res) => res.json({
    msg: `404 not found ${req.originalUrl}`,
    status:404
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))