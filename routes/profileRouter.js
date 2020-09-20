const express = require('express');
const router = express.Router();
const upload = require('./upload')
const Profile = require('../model/Profile');
const { verifyUser } = require('../auth');

router.route('/')
.get( verifyUser, (req, res, next) =>{
    Profile.findById(req.user.profile)
    .then((profiles) => {
        res.json(profiles);
    }).catch(err => next(err));
})
.post((req, res, next) => {
    const profile = {firstName, lastName, address, phone, 
        image, dateOfBirth, gender,bloodGroup,
         lastDonation} = req.body;
//   \ req.user is from auth.verifyUser which is from payload. 
    Profile.create(profile)
    .then(profile => {
        res.status(201).json(profile);
    }).catch(err => next(err));
})

.put(verifyUser, (req,res,next) => {
    const profile = {firstName, lastName, address, phone, 
        image, dateOfBirth, gender,bloodGroup,
         lastDonation} = req.body;

    Profile.findByIdAndUpdate(req.user.profile, {$set: profile},{new: true})
    .then(updatedProfile => {
        res.json(updatedProfile);
    }).catch(err => next(err));
})
module.exports = router;

