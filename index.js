const express = require('express')
const pool = require('./db.js')
const cors = require("cors");
const { query } = require('express');

const app = express()

app.use(
    cors({
      origin: 'http://localhost:3001',
    }),
);

app.use(express.json())

//GET

app.get('/api/occasions', async (req, res) => {
    const allOccasions = await pool.query(
        "SELECT * FROM occasions;"
    )
    res.status(200).json(allOccasions.rows)
})

app.get('/', (req, res) => {
    res.send('hello')
})

//POST

app.post('/api/occasions', async (req, res) => {
    const occasion = req.body
    const newOccasion = await pool.query(
        "INSERT INTO occasions (value) VALUES ($1) RETURNING *",
        [occasion.value]
    );
    res.json(newOccasion)
})

//DELETE



app.delete('/api/occasions/:id', async (req, res) => {
    const id = req.params.id
    const deleteOccasion = await pool.query(
        "DELETE FROM occasions WHERE id = $1",
        [id]
    )
    res.status(200).json(id)
})

//PUT

app.put('/api/occasions/:id', async (req, res) => {
    const id = req.params.id
    const marked = req.body.marked
    const updateMarked = await pool.query(
        "UPDATE occasions SET marked = $2 WHERE id = $1",
        [id, marked]
    )
    res.status(200).json(marked)
})

app.listen(3000, () => {
    console.log('Server has been started on port 3000...')
})


