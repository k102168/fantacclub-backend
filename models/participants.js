const mongoose=require('moongoose');
const Schema=mongoose.Schema;
const participantSchema=new Schema({
    _id : Schema.Types.ObjectId,
    name:{type:String , required :true},
    phoneNumber:{type:String},
    email:{type:String},
    wins:{type:Array},
})
const Participant=mongoose.model('participant',participantSchema);
module.exports=Participant;