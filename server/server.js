//general
const express = require('express');
const PORT = process.env.PORT || 3005;
const app = express();
const socket = require('socket.io');

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
 let server = app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})

let io = socket(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:["GET","POST"]
    }
});

io.on('connection',socket =>{
    const username = socket.handshake.query.username
    socket.join(username)

    socket.on('send-message',({recipients,text}) =>{
        console.log(text,recipients)
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r.username !== recipient.username)
            newRecipients.push(username)
            //console.log(newRecipients)
            // socket.boradcast.to(recipient).emit('receive-message',{
            // recipients:newRecipients,sender:username,text
            // })
        })
    })
})


