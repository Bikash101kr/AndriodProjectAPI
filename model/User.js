const mongoose = require('mongoose');
const Profile = require('./Profile');
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String,
        required: true,
        
    },
    email:{
        type:String,
        required: false
    },
    role:{
        type: String,
        required: false,
        default: 'basic',
        enum: ['basic', 'admin']
    },
    profile: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Profile,
		required: true,
	}
},{timestamps:true});

module.exports = mongoose.model('User', userSchema)