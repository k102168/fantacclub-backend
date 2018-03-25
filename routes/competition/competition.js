const router = require('express').Router();
const Competition = require('../../models/competition')
const mongoose = require('mongoose')

router.get('/competition', (req, res, next) => {
    Competition.find({}, function(err, results) {
        console.log(results)
        res.status(200).json(results)
      });
})

router.get('/competition/:competionId', (req, res, next)=>{
    const id = req.params.competionId;
    Competition.findById(id, (err, results)=>{
        res.status(200).json(results)
    } );
})

router.post('/competition', (req, res, next) =>{
    const {
        name,
        place,
        users,
        fee,
        priceMoney,
        startDate,
        endDate,
        leaderBoard,
        pigeons,
    } = req.body;
    const _id = new mongoose.Types.ObjectId();
    const competition = new Competition({
        _id,
        name,
        place,
        users,
        fee,
        priceMoney,
        startDate,
        endDate,
        leaderBoard,
        pigeons,
    });
    competition.save().then( result =>{
            res.status(200).json(result);
        })
        .catch( err =>{
            res.status(500).json({
                error: err
            })
        })
})


module.exports = router;