const express = require('express');
const router = express.Router();
const users = require('../data/users.json');
const bcrypt = require('bcryptjs');

router.use(express.urlencoded({extended:false}));
router.use(express.json());

router.post('/login',(req,res)=>{

    let {username, password} = req.body;

    //check to see if username (and maybe password) are present in the file
    let isUser = users.find(user => user.username == username);

    
    //console.log(isUser)
    if(isUser != undefined){
        res.json(isUser)
        console.log(isUser)
        
    } else {
        res.json({message:'user not found'})
    }
    
    



})

// f(user){
//     //if it is a real user
//     res.json({})
//   } else {
//     res.status(404); // status for unauthorized
//     throw new Error('Invalid email or password');
//   }






module.exports = router;
////###############PASSPORT#############################
// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;

//for passport
// passport.use(new localStrategy((username,password,done) => {
//     console.log('local stragegy called')
//     let user = users.filter(user => user.username == username);
//     console.log(user)
//     if(user != null){
//         let use = user[0];
//         console.log('19 :',password)
//         console.log('20 :',use.password)
//         bcrypt.compare(password,use.password,(err,res) => {
//             if(res){
//                 done(null,{id:use.id,username:use.username});
//                 // console.log('24 :',use.id)
//                 // console.log('25 :',use.username)
//                 console.log('made it this far')
//             } else {
//                 done(null,false)
//                 console.log('rejected at 24')
//             }
            
//         })
//     } else {
//         done(null,false)
//         console.log('rejected at 30')
//     }
    
// })) //eo passport.use

// router.post('/login',passport.authenticate('local',{successRedirect:'/',failureRedirect:'/register'}),(req,res) => {
//     res.send('you made it through!')
//     console.log('you made it through!')
    
// })

// passport.serializeUser((user, done) => {
//     done(null, user.id)
// })

// passport.deserializeUser((id,done) => {
//     let userArr = users.filter(user => user.id == id);
//     let user = userArr[0];
//     done(null,user)
// })

// router.get ('/logout',(req,res) => {
//     req.logOut();
//     console.log('user logged out')
    
// })
