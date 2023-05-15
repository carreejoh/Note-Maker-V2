const express = require('express');
const app = express();
const path = require('path');
const notes = require('./public/assets/db/db.json');

const PORT = 5500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    console.info('GET /api/notes')
    res.status(200).json(notes);
});




app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });