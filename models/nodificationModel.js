var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var nodificationSchema = new Schema({
	cons_id:          Number,
	task_id:          Number,
	title:            String,
	status:           String,
	description:      String,
	origin_app:       String,
	destination_url:  String,
	date:             Date
});

module.exports = mongoose.model('Nodification', nodificationSchema);