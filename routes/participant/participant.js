const router =  require('express').Router();
const Participant=require('../../models/participants');
const mongoose=require('mongoose');

//get all the participants
router.get('/participant',(req,res,next)=>   {
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
    } );
})
//post participants
router.post('/participant',(req,res,next)=>{
     console.log("Enter in Post Function")
     //console.log(req.body);
    // res.end();
    const  {
        name,
        phoneNumber,
        email,
        wins,
        roofnumber
    }=req.body;
const _id = new mongoose.Types.ObjectId();
    const participant=new Participant({
        _id,
        name,
        phoneNumber,
        email,
        wins,
        roofnumber
    })
    participant.save().then( result =>{
        res.status(200).json(result);
        console.log(result);
    })
    .catch( err =>{
        res.status(500).json({
            error: err
            
        })
        console.log(err);
    })
})
<<<<<<< HEAD
=======



>>>>>>> 2d4e74ecd1731cf4495eca355f9573a0c1f76c31
module.exports = router;
