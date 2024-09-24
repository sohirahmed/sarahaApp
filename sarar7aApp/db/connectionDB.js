const {default:mongoose} = require("mongoose");


module.exports.connectionDB=()=>{
    mongoose.connect("mongodb://localhost:27017/sara7aApp")
    .then(() =>console.log(`connected to database `))
    .catch((err) =>console.log("fail to connect", err));
};
