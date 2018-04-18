const router =  require('express').Router();
const Participant=require('../../models/participants');
const Competition=require('../../models/competition');
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
    const id=req.params['participantid'];
    Participant.findById(id, (err, results)=>{
        res.status(200).json(results)
    } );
})
//post participants
router.post('/participant',(req,res,next)=>{
     console.log("Enter in Post Function")
     console.log("Body: ",req.body);
     Competition.find({name:req.body.competitionName},function(err,competition){
         console.log("competition",competition)
        let pigeonCount = competition[0].pigeons
        console.log("pigeonCount: ",pigeonCount)
        let pigeonsLand=[]
        for(let i =0;i<pigeonCount;i++){
            pigeonsLand.push({
                pigeonNumber:i + 1,
	            landingTime:"00:00:00"
            })
        }
        console.log("pigeonsLand: ",pigeonsLand)
        const  {
            name,
            phoneNumber,
            email,
            wins,
            roofnumber,
            competitionId
        }=req.body;
        const _id = new mongoose.Types.ObjectId();
        const participant=new Participant({
            _id,
            name,
            phoneNumber,
            email,
            wins,
            roofnumber,
            competitionId
        })
        console.log("participant: ",participant)
        participant.pigeonLand = pigeonsLand
        //res.send(participant)
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
//     const  {
//         name,
//         phoneNumber,
//         email,
//         wins,
//         roofnumber
//     }=req.body;
// const _id = new mongoose.Types.ObjectId();
//     const participant=new Participant({
//         _id,
//         name,
//         phoneNumber,
//         email,
//         wins,
//         roofnumber
//     })
//     participant.save().then( result =>{
//         res.status(200).json(result);
//         console.log(result);
//     })
//     .catch( err =>{
//         res.status(500).json({
//             error: err
            
//         })
//         console.log(err);
//     })
})

router.put('/participant/:participantid',(req,res,next)=>{
    console.log("put: ", req.params['id']);
    console.log("req.body: ",req.body)
    const id=req.params['participantid'];
    // const  {
    //     name,
    //     pigeonLand,
    //     phoneNumber,
    //     email,
    //     wins,
    //     roofnumber
    // }=req.body;
    // const _id = new mongoose.Types.ObjectId();
    // const participant=new Participant({
    //     _id,
    //     name,
    //     phoneNumber,
    //     email,
    //     wins,
    //     roofnumber,
    //     pigeonLand
    // })
    

    Participant.findById(id, (err, results)=>{
        //results.pigeonLand.push(req.body)
        console.log(results)
        
        results.pigeonLand.map((p)=>{
            return p.pigeonNumber === req.body.pigeonNumber? p.landingTime=req.body.landingTime:null
        })
        console.log(results)
        //res.send(results)
        //res.status(200).json(results)
        Participant.update({_id: id}, results,
            function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }
        
            //console.log(doc);
            res.send(results)
        });

    } );
    
    // participant.update(
    //     { _id: req.params.id }, 
    //     { $push: { pigeonLand: { pigeonNumber: 2,landingTime: 'pigeonLand.landingTime' } } },
    //     function(err, raw){
    //         res.status(200).json(raw);
    //     }
    // );
    // participant.pigeonLand.push({ pigeonNumber: 2,landingTime: 'pigeonLand.landingTime' });
    // participant.save().then( result =>{
    //     let p1 = '20:54:60'.split(':');
    //     let ft = '06:00:00'.split(':');
    //     let cal1 =new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), p1[0],p1[1], p1[2]);
    //     let cal2 =new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), ft[0], ft[1], ft[2]);
    //     let diff = new Date(cal2 - cal1);

    //     var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
    //     console.log(cal1)
    //     console.log(cal2)
    //     let grandTotal = diff.getHours() + ':' +diff.getMinutes() + ':' + diff.getSeconds();
    //     result.grandTotal = grandTotal;
    //     res.status(200).json(result);
    //     console.log(result);
    // })
    // .catch( err =>{
    //     res.status(500).json({
    //         error: err
            
    //     })
    //     console.log(err);
    // });
    // participant.update(
    //     {_id:req.params.id}, 
    //     { $push: { pigeonLand: { pigeonNumber: 1,landingTime: 'pigeonLand.landingTime' }}}, 
    //     function (err, tank) {
    //         if (err) console.log(err);
    //         res.send(tank);
    //     });


    // participant.update(
    //     {_id:req.params.id},
    //     {
    //         $push: {
    //             pigeonLand: [{
    //                 pigeonNumber: 1, 
    //                 landingTime: 'pigeonLand.landingTime' 
    //             }],
    //         }
    //     },
    //     {safe: true, upsert: true},
    //     // {'$push': { "pigeonLand": { "$each": {
    //     //     pigeonNumber: pigeonLand.pigeonNumber,
    //     //     landingTime:  pigeonLand.landingTime
    //     // }}}},
    //     // {$push: {"pigeonLand": {"pigeonNumber": pigeonLand.pigeonNumber, "landingTime": pigeonLand.landingTime}}},
    //    // { "$push": { "pigeonLand": { "$each": pigeonLand } } },
    //    function(err, doc) {
    //         if(err){
    //         console.log(err);
    //         }else{
    //         //do stuff
    //         }
    //     }
    // //res.end();
    // )
})


module.exports = router;
