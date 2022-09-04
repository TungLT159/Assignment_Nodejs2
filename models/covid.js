const mongoose = require("mongoose")
const Schema = mongoose.Schema

const covidSchema = new Schema({
    temp: {
        type: Number,
        required: true
    },
    dateTemp: {
        type: Date,
        required: true
    },
    dateVaccine1: {
        type: Date,
        required: true
    },
    typeVaccine1: {
        type: String,
        required: true
    },
    dateVaccine2: {
        type: Date,
        required: true
    },
    typeVaccine2: {
        type: String,
        required: true
    },
    dateInfection: {
        type: Date
    },
    place: { type: String },
    staff: {
        name: { type: String, required: true },
        staffId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Staff'
        }
    }
})

module.exports = mongoose.model('Covid', covidSchema)