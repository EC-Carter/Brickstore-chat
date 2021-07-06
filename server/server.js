const express = require('express');
const PORT = process.env.PORT || 3005;
const app = express();
// need to bring user data in to file
//need to bring in node funcitonallity to write to json file

app.get('/api',(req,res) => {
    res.json({message:"this is working"});

})



app.use(require("./routes/users"));

//server start
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})