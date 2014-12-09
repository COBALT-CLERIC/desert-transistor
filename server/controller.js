var confusionModel = require('./model.js');
var helpers = require('./helpers.js');
var path = require('path');
var Q = require('q');

module.exports = {

	addVote: function(req, res, next){
		helpers.addVote(req.body, function(data){
			console.log('success');
			res.send(data);
		});
	},

	getVotes: function(req, res, next){
		helpers.getVotes(function(data){
			console.log('success');
			res.send(data);
		});
	}
};

