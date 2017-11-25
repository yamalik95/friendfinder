function Friend() {
	this.name = ''
	this.photo = ''
	this.scores = []
}

Friend.prototype.addName = function(name) {
	this.name = name
} 

Friend.prototype.addPhoto = function(photo) {
	this.photo = photo
}

Friend.prototype.addScores = function(obj) {
	var nums = ['1','2','3','4','5','6','7','8','9','10']
	for (var i = 0; i < nums.length; i++) {
		this.scores.push(parseInt(obj[nums[i]]))
	}
}

module.exports = Friend