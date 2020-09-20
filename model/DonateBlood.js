const mongoose = require('mongoose');
const donateSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'    
    },
    profile:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    weight:{
        type: String,
        required: false
    },
    country:{
        type:String,
        required: false
    },
    state: { 
        type: String,
        required: false
    },
    district:{
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    street: { 
        type: String,
        required: false
    },
    location:{
    type: String,
    required: false
    },
    status:{
        type: String,
        required: false,
        enum: ['used', 'on the way', 'stocked on blood bank']
    },
    donationDate:{
        type: String,
        required:false
    }

}, {timestamps: true});

module.exports = mongoose.model('DonateBlood',donateSchema );