require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

const PORT = process.env.PORT || 4000;

app.use(cors())

app.get('/api/v1/restaurants', async(req,res) => {
    const {rows} = await db.query('select * from restaurants')
    // res.send('bismillah').end(200)
    res.send(rows).status(200);
})

app.get('/api/v1/restaurants/:restaurantId', (req,res) => {
    res.send(req.params)
})

app.post('/api/v1/restaurants', (req,res) => {
    console.log(req.body)
})

app.put('/api/v1/restaurants/:id', (req,res) => {
    console.log(req.params.id)
    res.status(200).json({
        name: 'asmo'
    })
})

app.delete('/api/v1/restaurants/:id', (req,res) => {
    console.log(req.params.id)
    res.status(204)
})

app.listen(PORT, ()=> {`server is running on ${PORT}`})