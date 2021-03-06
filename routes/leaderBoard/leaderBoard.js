const router =  require('express').Router();
const Participant=require('../../models/participants');
const Competition=require('../../models/competition');
const mongoose=require('mongoose');
const _ =require('lodash')

router.get('/leaderboard',(req,res,next)=>   {
    let leaderboard = [];
    Competition.find({active: true},(error, result)=>{
        console.log("leaderboard compilition: ", result);
        Participant.find({competitionId:result[0]._id},(error, participants)=>{
            console.log("participants: ",participants)
             _.forEach(participants,function(participant){

                let grandTotal=_.forEach(pigeonLand,function(pl,i){
                    let p1 = pl.landingTime.split(':');
                    let ft = '06:00:00'.split(':');
            
                    let temptotal = (`${p1[0]-ft[0]}: ${p1[1]-ft[1]}: ${p1[2]-ft[2]}`).split(':');
            
                    grandT = (`${Number(temp[0])+Number(temptotal[0])}: ${Number(temp[1])+Number(temptotal[1])}: ${Number(temp[2])+Number(temptotal[2])}`).split(':');
            
                    if(Number(grandT[2])>59 || Number(grandT[1])>59 ){
                        if(Number(grandT[2])>59 ){
                            grandT=(`${grandT[0]}:${Number(grandT[1])+1}:${Number(grandT[2])-60}`).split(':')
                        }
                        if(Number(grandT[1])>59){
                            grandT=`${ Number(grandT[0]) + 1}:${Number(grandT[1])-60}:${grandT[2]}`.split(':');
                        }
                    }
                    temp=grandT
                })

                leaderboard.push({
                    activeCompetitionName:result[0].name,
                    participantsName:participant.name,
                    flyTime:result[0].flyTime,
                    pigeonLand:pigeonLand,
                    grandTotal:`${grandT[0].trim()}:${grandT[1].trim()}:${grandT[2].trim()}`
                })
             })
             res.send(leaderboard)
        })// Participants end

    }) //Competition end
    const pigeonLand=[
        {
            pigeonNumber: 1,
            landingTime: "07:50:10"
        },
        {
            pigeonNumber: 2,
            landingTime: "07:10:10"
        },
        {
            pigeonNumber: 3,
            landingTime: "7:10:10"
        },
        {
            pigeonNumber: 4,
            landingTime: "7:10:10"
        },
        {
            pigeonNumber: 5,
            landingTime: "7:50:10"
        },
        {
            pigeonNumber: 6,
            landingTime: "7:50:10"
        },
        {
            pigeonNumber: 7,
            landingTime: "7:50:10"
        }
    ];
    const pigeonLand1=[
        {
            pigeonNumber: 1,
            landingTime: "08:50:10"
        },
        {
            pigeonNumber: 2,
            landingTime: "08:10:10"
        },
        {
            pigeonNumber: 3,
            landingTime: "08:10:10"
        },
        {
            pigeonNumber: 4,
            landingTime: "08:10:10"
        },
        {
            pigeonNumber: 5,
            landingTime: "08:50:10"
        },
        {
            pigeonNumber: 6,
            landingTime: "08:50:10"
        },
        {
            pigeonNumber: 7,
            landingTime: "7:50:10"
        }
    ];
    let grandT ='00:00:00';
    let temp = '00:00:00'.split(':');
    let grandTotal=_.forEach(pigeonLand,function(pl,i){
        let p1 = pl.landingTime.split(':');
        let ft = '06:00:00'.split(':');

        let temptotal = (`${p1[0]-ft[0]}: ${p1[1]-ft[1]}: ${p1[2]-ft[2]}`).split(':');

        grandT = (`${Number(temp[0])+Number(temptotal[0])}: ${Number(temp[1])+Number(temptotal[1])}: ${Number(temp[2])+Number(temptotal[2])}`).split(':');

        if(Number(grandT[2])>59 || Number(grandT[1])>59 ){
            if(Number(grandT[2])>59 ){
                grandT=(`${grandT[0]}:${Number(grandT[1])+1}:${Number(grandT[2])-60}`).split(':')
            }
            if(Number(grandT[1])>59){
                grandT=`${ Number(grandT[0]) + 1}:${Number(grandT[1])-60}:${grandT[2]}`.split(':');
            }
        }
        temp=grandT
    })
    // let leaderboard = [
    //     {
    //         participantsName:"owais",
    //         flyTime:"06:00:00",
    //         pigeonLand:pigeonLand,
    //         grandTotal:`${grandT[0].trim()}:${grandT[1].trim()}:${grandT[2].trim()}`
    //     },
    //     {
    //         participantsName:"ahmed",
    //         flyTime:"06:00:00",
    //         pigeonLand:pigeonLand1,
    //         grandTotal:`${grandT[0].trim()}:${grandT[1].trim()}:${grandT[2].trim()}`
    //     }
    // ];
    //res.send(leaderboard)
})

module.exports = router;
