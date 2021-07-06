const express = require('express');
const router = express.Router();
const fs = require('fs');
const users = require('../data/users.json');

router.use(express.urlencoded({extended:false}));
router.use(express.json());


router.post('/usersData',(req,res) => {
    //need to write data to the json file
})

router.get('/usersData',(req,res) => {
     //need to display user data on client
    res.json(users)
})


module.exports = router;