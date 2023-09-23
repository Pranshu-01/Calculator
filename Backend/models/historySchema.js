const mongoose=require('mongoose');

const HistorySchema=new mongoose.Schema({
    userId:{type:String,required:true,unique:true},
    calculations:[
        {
            id:{type:String},
            name:{type:String},
            inputValue:{type:String}
        }
    ]
})

module.exports=mongoose.model("History",HistorySchema);