const router =  require('express').Router();
const Participant=require('../../models/participants');
const mongoose=require('mongoose');

//get all the participants
router.get('/participant',(rq,res,next)=>   {
    Participant.find({},function(err,results){
        console.log(results)
        res.status(200).json(results)
    })
})

//get only one participants
router.get('/participant/:participantid',(req,res,next)=>{
    const id=req.params.particpantid;
    Participant.findById(id, (err, results)=>{
        res.status(200).json(results)
    });
})

// add participant 
router.post('/participants',(req,res,next)=>{
    const {
        name,
        phoneNumber,    
        email,
        wins
    } = req.body;

    const _id = new mongoose.Types.ObjectId();

    const participant=new Participant({
        name,
        phoneNumber,
        email,
        wins
    });

    participant.save()
    .then(results=>{
        res.status(200).json(result);
    })
    .catch( err =>{
        res.status(500).json({
            error: err
        })
    })
})
