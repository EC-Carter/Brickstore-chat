const express = require('express');
const router = express.Router();
const users = require('../data/users.json');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;


//body parser??


//for passport
passport.use(new localStrategy((username,password,done) => {
    console.log('local stragegy called')
    let user = users.filter(user => user.username == username);
    if(user != null){
        bcrypt.compare(password,user.password,(err,res) => {
            if(res){
                done(null,{id:user.id,username:user.username});
            } else {
                done(null,false)
            }
            
        })
    } else {
        done(null,false)
    }
    
})) //eo passport.use

router.post('/login',() => console.log('middleware'),passport.authenticate('local',{failureRedirect:'/'}),(req,res) => {
    res.send('you made it through!')
})

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id,done) => {
    let user = users.filter(user => user.id == id);
    done(null,user)
})

module.exports = router;