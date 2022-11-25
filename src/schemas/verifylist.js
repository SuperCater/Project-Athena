const { Schema, model } = require('mongoose');

const verifyListSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userID: String,
    role: String,
});


const verifyModel = model('verifyList', verifyListSchema, 'verifyList');

module.exports = { verifyListSchema, verifyModel };

