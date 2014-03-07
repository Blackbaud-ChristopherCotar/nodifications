var Nodification = require('../models/nodificationModel.js');
var io = require('../lib/sockets');

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
		, options = {upsert: false};
	Nodification.findOneAndUpdate(conditions, update, options, function(err, doc){
    res.send('yay');
    console.log(doc);
    if(doc != null)
      io.routeToClient(doc.cons_id, doc);
  });
}

exports.updateSettings = function(req, res) {
	console.log("updateNodification");
	var conditions = {cons_id: req.params.cons_id}
		, update = {$set: {showEmail: req.body.showEmail,
    showReports: req.body.showReports,
    showBlueprints: req.body.showBlueprints,
    showGroups: req.body.showGroups,
    showErrors: req.body.showErrors, showClippy: req.body.showClippy}}
		, options = {upsert: false};
	Nodification.findOneAndUpdate(conditions, update, options, function(err, doc){
    res.send('yay');
    console.log(doc);
    if(doc != null)
      io.routeToClient(doc.cons_id, doc);
  });
}


