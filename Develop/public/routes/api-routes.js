const fs = require("fs");
const path = require("path");

const notesData = require('../db.json');

module.exports = function (app) {
  app.get('/api/notes', (req, res) => {
    res.json(notesData);
  });

  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = Date.now().toString();
    notesData.push(newNote);

    fs.writeFile(
      path.join(__dirname, '../db.json'),
      JSON.stringify(notesData, null, 2),
      (err) => {
        if (err) throw err;
        res.json(newNote);
      }
    );
  });

  app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const noteIndex = notesData.findIndex((note) => note.id === noteId);

    if (noteIndex !== -1) {
      notesData.splice(noteIndex, 1);
      fs.writeFile(
        path.join(__dirname, '../db.json'),
        JSON.stringify(notesData, null, 2),
        (err) => {
          if (err) throw err;
          res.json({ success: true });
        }
      );
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  });
};