var express = require('express')
var path = require("path")
var htmlRouter = express.Router()


htmlRouter.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../public/home.html')))
htmlRouter.get('/survey', (req, res) => res.sendFile(path.resolve(__dirname, '../public/survey.html')))


module.exports = htmlRouter
