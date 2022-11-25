const { Schema, model } = require('mongoose');

const verifyListSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userID: String,
    userName: String,
    userTag: String,
    roleID: String,
    roleName: String,
    rank: String,
});


const verifyModel = model('verifyList', verifyListSchema, 'verifyList');

module.exports = { verifyListSchema, verifyModel };

