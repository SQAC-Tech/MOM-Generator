import MOMModel from "../Modules/momSchema.js";

const MOM = async(req,res)=>{
    try{
        const{date, time, mode,agenda} = req.body;
        const newmom = new MOMModel({date, time, mode, agenda});
        await newmom.save();
        
    return res.status(201).json({
      message: "MOM created successfully",
      success: true
    });
    }
    catch(err){
    res.status(500).json({
      message: "Error occured",
      success: false,
      error: err.message
    });

    }
}

export default MOM;