const { Router } = require("express");
const { index, login , register , message , user , handleRegister , handleLogin , logOut , sendMessage} = require("./user.controller.js");

const userRouter = Router()


userRouter.get('/index' , index)
userRouter.get('/login' , login)
userRouter.get('/register' , register)
userRouter.get('/message' , message)
userRouter.get('/user/:id' , user)
userRouter.post('/handleRegister' , handleRegister)
userRouter.post('/handleLogin' , handleLogin)
userRouter.get('/logOut' , logOut)
userRouter.post('/sendMessage/:id' , sendMessage)





module.exports = userRouter