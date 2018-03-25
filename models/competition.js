const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const competitionSchema = new Schema({
    _id : Schema.Types.ObjectId,
    name: { type: String, required: true },
    place: { type: String},
    users: { type: Number},
    fee: { type: Number},
    priceMoney: { type: Array},
    startDate: { type : Date, default: Date.now},
    endDate: { type : Date, default: Date.now},
    leaderBoard: { type: Array},
    pigeons: { type: Number}
})

const Competition = mongoose.model('competition', competitionSchema);
module.exports = Competition;