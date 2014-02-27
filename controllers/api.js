var Nodification = require('../models/nodificationModel.js');

exports.pushNodification = function(req, res) {
	console.log("pushNodification: ");
	console.log(req.body);
	var nodification = new Nodification({
		cons_id: req.body.cons_id,
		task_id: req.body.task_id,
		title: req.body.title,
		status: req.body.status,
		description: req.body.description,
		origin_app: req.body.origin_app,
		destination_url: req.body.destination_url,
		date: req.body.date
	});

	nodification.save(function(err) {
		if(!err) {
      res.status(201).send('nodification added to database successfully');
			console.log("Push Successful!");
		} else {
			console.log(err);
		}		
	});
}

exports.pullNodifications = function(req, res) {
	console.log("pullNodifications");
	Nodification.find(function(err, nodifications) {
		if(!err) {
			res.send(nodifications);
		} else {
			console.log(err);
		}
	});
}

exports.pullNodificationsByConsId = function(req, res) {
	console.log("pullNodifications");
	Nodification.find({cons_id: req.params.cons_id},function(err, nodifications) {
		if(!err) {
			res.send(nodifications);
		} else {
			console.log(err);
		}
	});
}

exports.updateNodification = function(req, res) {
	console.log("updateNodification");
	var conditions = {task_id: req.params.task_id}
		, update = {$set: {status: req.body.status}}
		, options = {upsert: true};
	Nodification.update(conditions, update, options, function(err){});
}

