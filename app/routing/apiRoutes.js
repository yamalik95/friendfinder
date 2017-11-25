var express = require('express')
var path = require("path")
var apiRouter = express.Router()



apiRouter.get('/api/friends', function (req, res) {
	res.setHeader('Content-Type', 'application/json')
	res.sendFile(path.resolve(__dirname, '../data/friends.json'))
})

module.exports = apiRouter