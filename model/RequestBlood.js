const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    requirement:{
        type: String,
        required: true,
        default: false,
        enum: ['fresh','stocked', 'any of above']
    },
    patientName:{
        type: String,
        required: true
    },
    patientAge:{
        type: String,
        required: true
    },
    bloodGroup:{
        type: String,
       required: true,
        default: false,
        enum: ['A+','B+','AB+','O+','A-','B-','AB-','O-']
    },

    hospitalName:{
        type: String,
        required: true
    },
    fullAddress:{
        type: String,
        required: true,
    },
    needUnit:{
        type: String,
        required: true
    },
    requirementReason:{
        type: String,
        required: true
    },
    requireBefore:{
        type: String,
        required: true
    },
    requestDate:{
        type: String,
        required: false
    }
},{timestamps:true});

module.exports = mongoose.model('RequestBlood',requestSchema )

