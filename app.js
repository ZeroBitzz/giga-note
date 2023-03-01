const express = require('express') // express
const ejs = require('ejs')
const fs = require('fs')

// setup app
const app = express()
const port = 3000

app.use(express.static(__dirname + '/public')); // load static files from public directory
app.use(express.json()) //parses json requests

// set view engine
app.set('view engine', 'ejs')


// home route
app.get('/', function(req, res){
    res.render('index')
})

app.get('/notes', function(req, res){
    res.render('notes')
})

// notes route
app.get('/api/notes', function(req, res, next){
    res.end(fs.readFileSync('db/db.json'))
})

app.post('/api/notes', function(req, res, next){
    const notes = JSON.parse((fs.readFileSync('db/db.json')))
    const note = req.body
    note['id'] = notes.length + 1
    notes.push(note)
    const data = (JSON.stringify(notes))
    fs.writeFile('db/db.json', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    res.status(204).end()
})

app.delete('/api/notes/:id', function(req, res, next){
    const notes = JSON.parse((fs.readFileSync('db/db.json')))
    notes.forEach((note, index) => {
      if(note.id === Number(req.params.id)){
        notes.splice(index, 1)
      }  
    })
    notes.forEach((note, index) => {
        note.id = index + 1
    })
    const data = (JSON.stringify(notes))
    fs.writeFile('db/db.json', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    res.status(204).end()
})

// server setup
app.listen(port, function(err){
    if(err) console.log(err)
    console.log(`server listening on port ${port}`)
})