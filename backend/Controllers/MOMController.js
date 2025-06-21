import MOMModel from "../Modules/momSchema.js";

export const MOM = async (req, res) => {
  try {
    console.log("▶️ Received POST /mom data:", req.body); // Log incoming data

    const { date, time, mode, agenda, department } = req.body;

    // Optional validation
    if (!date || !time || !mode || !agenda || !department) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const newmom = new MOMModel({ date, time, mode, agenda, department });
    await newmom.save();

    return res.status(201).json({
      message: "MOM created successfully",
      success: true,
    });
  } catch (err) {
    console.error("🔥 Error in POST /mom:", err); // Log the real error
    res.status(500).json({
      message: "Error occurred",
      success: false,
      error: err.message,
    });
  }
};
