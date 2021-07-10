const express = require('express');
const router = express.Router();
const fs = require('fs');
const users = require('../data/users.json');
const {v4:uuidv4} = require ('uuid');
const bcrypt = require('bcryptjs');

router.use(express.urlencoded({extended:false}));
router.use(express.json());


router.post('/usersData',(req,res) => {
    //console.log('working')
    let {username, password} = req.body;

    //check and see if username is unique. if not send back boolean
    let isUnique = users.find(user => user.username == username)

    if (isUnique != undefined){
        let userNameTaken = true
        res.json({userNameTaken:userNameTaken})

    } else {
         //encrypt password
        let passwordEncrypt = bcrypt.hashSync(password,8);
        let newUser = {
            id:uuidv4(),
            username,
            password:passwordEncrypt,
            isApproved:false,
            role:0
        }
    
        //wite to json file
        users.unshift(newUser);
        fs.writeFile('data/users.json',JSON.stringify(users),'utf8',(e)=>{
            if(e){
                console.log(e)
            }
        })
        res.json(newUser)
    }
})//eo router.post /usersData

router.post('/getUser', (req,res) => {
    let {username} = req.body;
    //find user object that matches username
    let contact = users.find(user => user.username == username)
    //console.log(contact)
    //send back user object or an error if user is not found 
    if(contact != undefined){
        res.json(contact)
    } else {
        res.json({message:'user not found'})
    }

})

router.get('/usersData',(req,res) => {
     //need to display user data on client
    res.json(users)
})


module.exports = router;