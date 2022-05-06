const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    serverID: { type: String, require: true},
    points: { type: Number, default: 0}
})

const model = mongoose.model("profileModels", profileSchema)

module.exports = model