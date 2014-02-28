var io = require('../lib/sockets');
var UserSettings = require('../models/userSettings.js');


exports.updateUserSettings = function(settings){
    console.log("updateUserSettings");
    var conditions = {cons_id: settings.cons_id }
        , update = {$set: {numResults      : settings.numResults,
                           cons_id         : settings.cons_id,
                           showEmail       : settings.showEmail,
                           showReports     : settings.showReports,
                           showBlueprints  : settings.showBlueprints,
                           showGroups      : settings.showGroups,
                           showErrorsOnly  : settings.showErrorsOnly
        }}
        , options = {upsert: true};
        UserSettings.findOneAndUpdate(conditions, update, options, function(err, doc){
            io.routeToClient(doc.cons_id, doc);
    });
}