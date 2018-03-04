const express = require('express')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const engines = require('consolidate')
const bodyParser = require('body-parser')
const JSONStream = require('JSONStream')

const helpers = require('./helper')
const User = require('./mongoose').User

const app = express()

app.engine('hbs', engines.handlebars)

app.set('views', './views')
app.set('view engine', 'hbs')

app.use('/profilepics', express.static('images'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/favicon.ico', function (req, res) {
  res.end()
})

app.get('/', function (req, res) {
  /*
  var users = []
  fs.readdir('users', function (err, files) {
    if(err) throw err
    files.filter(file => { return (path.extname(file) == '.json')}).forEach(function (file) {
      fs.readFile(path.join(__dirname, 'users', file), {encoding: 'utf8'}, function (err, data) {
        if(err) throw err
        var user = JSON.parse(data)
        user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
        users.push(user)
        if (users.length === files.filter(file => { return (path.extname(file) == '.json')}).length) res.render('index', {users: users})
      })
    })
  })
  */
  User.find({}, (err, users) => {
    res.render('index', {users: users})
  })
 // res.send(`${users.length} - ${files.length} `)
})

app.get('*.json', (req,res) => {
  res.download('./users/' + req.path, 'user.txt')
})


  
app.get('/data/:username', (req, res) => {
  let username = req.params.username
  let readable = fs.createReadStream('./users/' + username + '.json')
  //console.log(readable)
  readable.pipe(res)



  /*
  let user = helpers.getUser(username)
  res.json(user)
  */
}) 


app.get('/users/by/:gender', (req, res) => {
  let gender = req.params.gender
  let readable = fs.createReadStream('users.json')
  readable
    .pipe(JSONStream.parse('*', user => {
      if(user.gender === gender) return user.name
    }))
    .pipe(JSONStream.stringify('[\n ', ',\n ', '\n]\n'))
    .pipe(res)
})

app.get('/error/:username', (req, res) => {
  res.status(404).send(`No user ${req.params.username} found`)
})


var userRouter = require('./username')
app.use('/:username', userRouter)

var server = app.listen(3000, function () {
  console.log('Server running at http://localhost:' + server.address().port)
})
