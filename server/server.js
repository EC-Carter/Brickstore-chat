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
        
        recipients = recipients.map (r => r.username);
        
        recipients.forEach(recipient => {
            //const newRecipients = recipients.filter(r => r !== recipient)
            //newRecipients.push(username)
            console.log(text,recipients)
            socket.broadcast.to(recipient).emit('receive-message',{
            recipients:recipients,sender:username,text

            })
        })
    })
})


