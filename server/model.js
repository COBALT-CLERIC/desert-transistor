var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var confusionSchema = new mongoose.Schema({
	lectureID:  String,
	studentID:  String
});

confusionSchema.plugin(timestamps);

module.exports = mongoose.model('confusionDB', confusionSchema);
