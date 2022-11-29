// Variables declared
const express = require("express")
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const notes = require("./db/db.json");

// Testing the port before code activates
const app = express();
const PORT = process.env.port || 3001;

// Middleware explained
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes for APIs
// Save notes and add to "db.json"
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
}) 

// To add new notes to "db.json"
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);      
    // res.sendFile(path.join(__dirname, "/db/db.json"));
}) 

// To delete note from "db.json"
app.delete("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(delNote))
    res.json(delNote);
}) 

// HTML calls
// Calls index.HTML page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
}) 

// Calls notes.HTML page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
}) 

// Start port / listen
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

