const express = require('express')
const fs = require('fs')

const User = require('./mongoose').User
const helpers = require('./helper')

const router = express.Router({
    mergeParams: true
})


  
  //router.all('/', (req, res, next) => {
  router.use((req, res, next) => {
    console.log(req.method, 'for', req.params.username)
    next()
  })
  


  //router.get('/', helpers.verifyUser, (req, res) => {
  router.get('/', (req, res) => {
    var username = req.params.username
    User.findOne({username}, (err, user) => {
      res.render('user', {
        user: user,
        address: user.location
      }) 
    })
    /*
    var user = helpers.getUser(username)
    res.render('user', {
      user: user,
      address: user.location
    })
    */
  })
  /*
  Express have already a built-in error management middleware
  router.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('Server Error: ' + err.stack)
  }) 
  */
  router.get('/edit', (req, res) => {
    res.send(`You want to edit ${req.params.username} ????`)
  })
  router.put('/', (req, res) => {
    var username = req.params.username
    console.log(req.body)

    User.findOneAndUpdate({username}, {location: req.body}, (err, user) => {
      res.end()
    })


    res.end()
    /*
    var user = helpers.getUser(username)
    user.location = req.body
    helpers.saveUser(username, user)
    res.end()
    */
  })
  
  
  router.delete('/', function (req, res) {
    var fp = helpers.getUserFilePath(req.params.username)
    // fs.unlinkSync(fp) // delete the file
    fs.rename(fp, fp + 'bak', (err) => {
      if (err) throw err;
      console.log(`User ${req.params.username} was successfully renamed/deleted.`) 
    });  
  
    res.sendStatus(200)
  })
  
  module.exports = router