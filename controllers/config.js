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
                           showErrors      : settings.showErrors,
                           showClippy      : settings.showClippy
        }}
        , options = {upsert: true};
        UserSettings.findOneAndUpdate(conditions, update, options, function(err, doc){
    });
}

exports.saveSettings = function(settings) {
    var settingsToSave = new UserSettings({
        cons_id: settings.cons_id,
        numResults: settings.numResults,
        showEmail: settings.showEmail,
        showReports: settings.showReports,
        showBlueprints: settings.showBlueprints,
        showGroups: settings.showGroups,
        showErrors: settings.showErrors,
        showClippy: settings.showClippy
    });

    settingsToSave.save(function(err) {
        if(!err) {
            console.log("Saved Settings!");
        } else {
            console.log(err);
        }
    });
}


exports.sendSettings = function (socket, cons_id){

    UserSettings.find({cons_id: cons_id},function(err, settings) {
        if(err) {
            console.log(err);
        } else {
            if (!settings || settings.length == 0) {
                settings = defaultSettings;
                settings.cons_id = cons_id;
                exports.saveSettings(settings);
            }

            socket.emit("applyUserSettings", settings);
        }

    });
};


var defaultSettings = { numResults      : 10,
                        showEmail       : true,
                        showReports     : true,
                        showBlueprints  : true,
                        showGroups      : true,
                        showError       : false,
                        showClippy      : false
                      };