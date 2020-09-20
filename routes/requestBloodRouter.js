const express = require('express');
const router = express.Router();
const { verifyUser, verifyAdmin } = require('../auth');
const RequestBlood = require('../model/RequestBlood');

router.route('/')
.get(verifyUser, (req, res, next)=>{
    RequestBlood.find({owner: req.user.id})
    .then(requests=> {
        res.setHeader('Content-Type', 'application/json');
        res.json(requests);
    }).catch(next);
})
.post(verifyUser,(req, res, next)=> {
    let { requirement, patientName, patientAge, 
        bloodGroup, fullAddress,  hospitalName,  needUnit,
requirementReason, requireBefore, requestDate } = req.body;
    RequestBlood.create( { owner: req.user.id, requirement, patientName, patientAge, 
        bloodGroup, fullAddress, hospitalName,  needUnit,
requirementReason, requireBefore, requestDate })
    .then( Request => {
        res.status(201).json(Request);

    }).catch(err => next(err));
})
.delete(verifyUser,(req, res,next) => {
    RequestBlood.deleteOne({owner: req.user.id})
    .then(reply=> {
        res.json(reply);
    }).catch(next);
});
router.route('/:request_id')
.get((req,res,next) => {
    RequestBlood.findById(req.params.request_id)
    .then(Request => {
        res.json(Request);
    }).catch(next);
})

.put((req,res,next) => {
    RequestBlood.findByIdAndUpdate(req.params.request_id,{$set: req.body},{new: true})
    .then(updateRequest => {
        res.json(updateRequest);

    }).catch(next);
})
.delete((req, res, next) => {
    RequestBlood.deleteOne({_id:req.params.request_id})
    .then(reply => {
        res.json(reply);
    }).catch(next);
})

module.exports = router;