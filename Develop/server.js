const express = require('express');
const app = express();
const path = require('path');
const notes = require('./public/assets/db/db.json');
const fs = require('fs');
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
    console.info('GET /api/notes');
    console.log(notes);
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if(req.body) {
        const newNote = {
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

                fs.writeFile('./public/assets/db/db.json', JSON.stringify(parsedNotes, null, 4), 
                (writeErr) => writeErr ? console.error(writeErr) : console.info("successfully added note"));
            }
        });
    }
})


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });