require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

app.use(cors())

app.get('/api/v1/restaurants', async(req,res) => {
    // res.send('bismillah').end(200)
    try{
       const {rows} = await db.query('select * from restaurants')
    res.json({
        resStatus: 'success',
        length: rows.length,
        restaurants: rows
    }).status(200);
   }
   catch(e){
    res.send(e.message)
   }
})

app.get('/api/v1/restaurants/:id', async(req,res) => {
    let {id} = req.params
      try{
       const {rows:[row]} = await db.query('select * from restaurants where id = $1', [id])
    res.json({
        resStatus: 'success',
        restaurant: row
    }).status(200);
   }
   catch(e){
    res.send(e.message)
   }
})

app.post('/api/v1/restaurants', async(req,res) => {
     
    const {name,location,price_range} = req.body
      try{
       const {rows:[row]} = await db.query('insert into restaurants(name,location,price_range) values($1,$2,$3) returning *;', [name,location,price_range])
    res.json({
        resStatus: 'success',
        restaurant: row
    }).status(200);
   }
   catch(e){
    res.send(e.message)
   }
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