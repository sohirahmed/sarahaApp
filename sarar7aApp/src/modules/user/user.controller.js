const { name } = require("ejs")
const userModel = require("../../../db/models/user.model.js")
const session = require("express-session")
const messageModel = require("../../../db/models/message.model.js")



module.exports.index=(req,res,next)=>{

    res.render("index.ejs",{loggedIn:false})
}

module.exports.login =(req,res,next)=>{
    const{error} = req.query
    res.render('login.ejs',{
        error,
        loggedIn:false
    })
    
}

module.exports.register =(req,res,next)=>{
    res.render('register.ejs' ,{
        error:req.query.error,
        loggedIn:false

    })
    
}

module.exports.message =async(req,res,next)=>{
    const messages = await messageModel.find({userId:req.session.userId})
    const url = `${req.protocol}://${req.headers.host}/user/${req.session.userId}`
    if(req.session.loggedIn){ 
        res.render('message.ejs',{loggedIn:req.session.loggedIn , session:req.session , messages , url})
    }else{
        res.redirect("/login")
    }
    
    
}

module.exports.user =(req,res,next)=>{
    
    res.render('user.ejs',{loggedIn:req.session.loggedIn , session:req.session})
    
}

module.exports.handleRegister =async(req,res,next)=>{

    const{name , email , password } = req.body
    const userExist = await userModel.findOne({email})
    if(userExist){
        return res.redirect('/register?error=User already exist')
    }
    await userModel.create({name , email , password })
    res.redirect('/login')    
}

module.exports.handleLogin =async(req,res,next)=>{

    const{email , password } = req.body
    const userExist = await userModel.findOne({email})
    if(!userExist || password != userExist.password){
        return res.redirect('/login?error=User not exist or password is incorrect')
    }

    // res.setHeader("set-cookie","userId" + userExist._id)
    req.session.userId = userExist._id
    req.session.name = userExist.name
    req.session.loggedIn = true

    res.redirect('/message')    
}
module.exports.logOut =async(req,res,next)=>{
    req.session.destroy(function(err){

        res.redirect("/login")
    })
}

module.exports.sendMessage =async(req,res,next)=>{
    console.log(req.body);
    console.log(req.params);
    await messageModel.create({userId:req.params.id , content:req.body.msg})
    res.redirect(`/user/${ req.params.id}`)
    
}


