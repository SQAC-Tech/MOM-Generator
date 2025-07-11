import mongoose, { Schema } from "mongoose";


const MOMSchema = new Schema({
    date:{
        type:Date,
    },
    time:{
        type:String,
    },
    mode:{
        type:String,
    },
    agenda:{
        type: String,
    },
    department: {
    type: String, // <-- ADD THIS
  },

});

const MOMModel = mongoose.model('mom_data',MOMSchema);
export default MOMModel;