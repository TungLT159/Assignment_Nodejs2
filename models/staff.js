const mongoose = require('mongoose')
const Schema = mongoose.Schema

const staffSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    doB: {
        type: Date,
        required: true
    },
    salaryScale: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    annualLeave: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    },
    isWork: { type: Boolean },
    onLeave: {
        dateStart: {
            type: Date
        },
        dateEnd: {
            type: Date
        },
        reason: { type: String },
        hourAnnualLeave: {
            type: Number
        }
    },
    endDayWork: { type: Boolean, required: true },
    totalHours: { type: Number, required: true },
    sessionWork: [
        [{
            timeStart: { type: Date },
            timeEnd: { type: Date },
            totalHour: { type: Number },
            name: { type: String, required: true },
            placeWork: { type: String, required: true },
            totalHourWork: { type: Number },
            hourAnnualLeave: { type: Number },
            overTime: { type: Number }
        }]
    ]
})

module.exports = mongoose.model('Staff', staffSchema)