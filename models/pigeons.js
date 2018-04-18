const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const pigeonsSchema=new Schema({
    participantId : {type:String, required :true},
    flyTime: {type: String, require:true},
    pigeonLand: [{
        pigeonNumber:{type:Number, required :true}, 
        landingTime:{type:String, required :true}
    }],
});

const Pigeons=mongoose.model('participant',pigeonsSchema);
module.exports=Pigeons;