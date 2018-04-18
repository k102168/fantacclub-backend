const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const participantSchema=new Schema({
    _id : Schema.Types.ObjectId,
    // _id:    {Schema:Types.ObjectId, default: new ObjectId()},
    name:{type:String, required :true},
    phoneNumber:{type:String},
    email:{type:String},
    //wins:{type:Array},
    roofnumber:{type:String},
    pigeonLand: [{
        pigeonNumber:{type:Number}, 
        landingTime:{type:String}
    }],
    grandTotal: {type:String},
    competitionId: {type:String}
},{ versionKey: false })
const Participant=mongoose.model('participant',participantSchema);
module.exports=Participant;