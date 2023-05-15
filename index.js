const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;


// middleWare
app.use(cors())
app.use(express())



app.get('/', (req, res) =>{
    res.send('Ema is shopping and wasting money')
})

app.listen(port, ()=>{
    console.log(`Ema is running on the port ${port}`);
})