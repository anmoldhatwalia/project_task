const express = require('express');
const cors = require('cors');
const dot = require('dotenv');
const routes = require('./routes/auth.route');
const connectDB = require('./config/db');

dot.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth",routes)

app.get('/',(req,res)=>{
    res.send('<h1>welcome in my Server</h1>')
})

app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`)
});
