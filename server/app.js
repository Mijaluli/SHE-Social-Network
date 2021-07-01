const express= require ('express')
const app = express()
const mongoose = require ('mongoose')
const {MONGOURI} = require ('./valueKeys')
const PORT = 5000;
const user= require('./models/user')
const post= require('./models/post')


mongoose.connect(MONGOURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.connection.on('connected',()=>{
    console.log('Connected to database')
})
mongoose.connection.on('error',()=>{
    console.log('Not connected to database')
})

//after we connect to the server
app.use (express.json())
app.use (require("./routes/auth"))
app.use (require("./routes/postRoute"))

app.listen(PORT,()=>{
    console.log('Server is running at', PORT)
})

