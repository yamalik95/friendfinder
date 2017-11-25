var express = require('express')
var path = require("path")
require('dotenv').config()
var bodyParser = require("body-parser")
var fs = require('fs')
var Friend = require(path.join(__dirname, '/app/data/friends.js'))

var app = express()

var htmlRouter = require(path.join(__dirname, '/app/routing/htmlRoutes.js')) 
var apiRouter = require(path.join(__dirname, '/app/routing/apiRoutes.js'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/', htmlRouter)
app.use('/survey', htmlRouter)
app.use('/api/friends', apiRouter)


app.post('/api/friends', function(req, res) {
	var person = new Friend()
	person.addName(req.body.name)
	person.addPhoto(req.body.image)
	person.addScores(req.body)
	var jsonFile = path.join(__dirname, '/app/data/friends.json')
	fs.readFile(jsonFile, 'utf8', function(err, data) {
		var friendArray = eval(data)
		var minDifference = 2000
		var mathcedIndex = -1
		for (var i = 0; i < friendArray.length; i++) {
			var sqrDifSum = 0
			for (var j = 0; j < person.scores.length; j++) {
				sqrDifSum += (person.scores[j] - friendArray[i].scores[j])^2
			}
			if (sqrDifSum < minDifference) {
				minDifference = sqrDifSum
				mathcedIndex = i
			}
		}
		var matchedPerson = friendArray[mathcedIndex]
		var dataToWrite = ''
		if (data.length > 5) {
			var slicedData = data.slice(0,data.trim().length-1)
			dataToWrite = slicedData + ',' + JSON.stringify(person) + ']'
		} else {
			dataToWrite = '[' + JSON.stringify(person) + ']'
		}
		fs.writeFile(jsonFile, dataToWrite, (err) => {
			if (err) {throw err}
		})
		res.json(matchedPerson)
		//pseudocode: Need to make modal show up with matched person's info and pic instead of mere json data
	})
})



app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});