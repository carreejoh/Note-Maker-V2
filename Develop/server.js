const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const notes = require('./public/assets/db/db.json');
const uuid = require('./public/assets/js/uuid');
// const index = require('./public/assets/js/index.js');

const PORT = 5500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
    console.log("I'm reached yaya");
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if(req.body) {
        const newNote = {
            id: uuid(),
            title,
            text,
        };
        res.json(newNote);
        console.log(newNote);
        
        fs.readFile('./public/assets/db/db.json', 'utf8', (err, data) => {
            if(err) {
                console.log(err);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);

                fs.writeFile('./public/assets/db/db.json', JSON.stringify(parsedNotes, null, 1), 
                (writeErr) => writeErr ? console.error(writeErr) : console.info("successfully added note"));
            }
        });
    }
});


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });