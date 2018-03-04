var fs = require('fs')
var path = require('path')
var _ = require('lodash')

const getUserFilePath = username => path.join(__dirname, 'users', username) + '.json'

const getUser = username => {
    var user = JSON.parse(fs.readFileSync(getUserFilePath(username), {encoding: 'utf8'}))
    user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
    _.keys(user.location).forEach(function (key) {
        user.location[key] = _.startCase(user.location[key])
    })
    return user
}

const saveUser = (username, data) => {
    var fp = getUserFilePath(username)
    fs.unlinkSync(fp) // delete the file
    fs.writeFileSync(fp, JSON.stringify(data, null, 2), {encoding: 'utf8'})
}

const verifyUser = (req, res, next) => {
    var fp = getUserFilePath(req.params.username)
    fs.exists(fp,yes => {
        if(yes) {
        next()
        } else {
        res.redirect('/error/' + req.params.username)
        }
    })
} 

exports.getUser = getUser
exports.getUserFilePath = getUserFilePath
exports.saveUser = saveUser
exports.verifyUser = verifyUser