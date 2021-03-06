const express = require('express');
const router = express.Router();
const DonateBlood = require('../model/DonateBlood');
const { verifyUser, verifyAdmin } = require('../auth');
const { update } = require('../model/DonateBlood');

router.route('/')
.get(verifyUser,(req, res, next)=>{
    DonateBlood.find({owner: req.user.id})
    .then(donations=> {
        res.setHeader('Content-Type', 'application/json');
        res.json(donations);
    }).catch(next);
})
.post(verifyUser,(req, res, next)=> {
        let { weight, country, state, district, city, street, location, donationDate} = req.body;
        DonateBlood.create({ owner: req.user.id,  weight, country, state, 
            district, city, street, location, donationDate})
    .then( donations => {
        res.status(201).json(donations);

    }).catch(err => next(err));
})
.delete((req, res,next) => {
    DonateBlood.deleteOne({owner: req.user.id})
    .then(reply=> {
        res.json(reply);
    }).catch(next);
});
router.route('/:donation_id')
.get(verifyUser,(req,res,next) => {
    DonateBlood.findById(req.params.donation_id)
    .then(Donation => {
        res.json(Donation);
    }).catch(next);
})
.put((req,res,next) => {
    DonateBlood.findByIdAndUpdate( req.params.donation_id,
        {$set: {weight: req.body.weight, 
            country: req.body.country, 
            state: req.body.state, 
            district: req.body.district, 
            city: req.body.city, 
            street: req.body.street, 
            location: req.body.location,
            donationDate: req.body.donationDate}},{new: true})
    .then(updatedDonation => {
        res.json(updatedDonation);

    }).catch(next);
   //} 
        
    //if (req.user.role == 'admin')
    //{
        // DonateBlood.findByIdAndUpdate(req.params.donation_id,
        //     {$set: { status: req.body.status, donation_id: req.body.donation_id}}, {new: true})
        //     .then(updatedDonation => {
        //         res.json(updatedDonation)

        //     }).catch(next);
    //}

})

.delete((req, res, next) => {
    DonateBlood.deleteOne({_id:req.params.donation_id})
    .then(reply => {
        res.json(reply);
    }).catch(next);
})
router.route('/:donation_id/status')
.get((req, res, next)=>{
    DonateBlood.findById(req.params.donation_id)
    .then(Donation => {
        res.json(Donation.Status);
    }).catch(next);
})

.put(verifyAdmin, (req, res, next)=> {
    DonateBlood.findByIdAndUpdate(req.params.donation_id, {$set: { status: req.body.status}}, {new: true})
    .then(DonateBlood => {
        res.json(DonateBlood);
    }).catch(next);
})

module.exports = router;