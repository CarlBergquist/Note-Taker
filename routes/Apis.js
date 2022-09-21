const router = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile,  readAndAppend } = require('../helpers/fsUtils');
const db = require('../db/db.json')

router.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/api/notes', (req, res) => {
    console.log(req.body)

    const { title, text } = req.body

    if (req.body) { 
    const payload = {
        title,
        text,
        id: uuidv4()
    }
    readAndAppend(payload, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error');
  }
});

router.delete('/api/notes/:id' , (req, res) => {
  const { id } = req.params;
  console.log(id)
  res.send('done')
  
})

module.exports = router;