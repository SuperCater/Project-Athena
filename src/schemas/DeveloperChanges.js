const { Schema, model } = require('mongoose');

const developerChanges = new Schema({
    _id: Schema.Types.ObjectId,
    userID: String,
    userName: String,
    userTag: String,
    change: String,
    date: String,
    time: String,
    media: String,
    approved: Boolean,
});

const developerModel = model('developerChanges', developerChanges, 'developerChanges');
module.exports = { developerModel };
