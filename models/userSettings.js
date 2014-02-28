
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var userSettingsSchema = new Schema({
    numResults:       Number,
    cons_id:          Number,
    showEmail:        Boolean,
    showReports:      Boolean,
    showBlueprints:   Boolean,
    showGroups:       Boolean,
    showErrorsOnly:   Boolean
});

module.exports = mongoose.model('UserSettings', userSettingsSchema);