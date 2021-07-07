//general
const express = require('express');
const PORT = process.env.PORT || 3005;
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//for passport
const cookieSession = require('cookie-session');
const passport = require('passport');

//set up cookie session
app.use(cookieSession({
    name:'session',
    keys:['dsjkhdhdshjewrureuddjskhdjfshjfdsjh'],
    maxAge: 14 * 24 * 60 * 60 * 1000
}))

//passport init
app.use(passport.initialize());
app.use(passport.session());




// app.get('/api',(req,res) => {
//     res.json({message:"this is working"});

//})


//routes
app.use(require("./routes/users"));
app.use(require("./routes/login"));

//server start
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})