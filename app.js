const express = require('express') // express
const ejs = require('ejs')

// setup app
const app = express()
const port = 3000

// set view engine
app.set('view engine', 'ejs')

// home route
app.get('/', function(req, res){
    res.render('index')
})

// notes route
app.get('/notes', function(req, res){
    res.render('notes')
})

// server setup
app.listen(port, function(err){
    if(err) console.log(err)
    console.log(`server listening on port ${port}`)
})