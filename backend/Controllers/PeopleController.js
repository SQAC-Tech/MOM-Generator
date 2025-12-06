import People from "../Modules/People.js";

export const getPeople = async (req, res) => {
  try {
    const people = await People.find().sort({ name: 1 });
    res.json({ success: true, people });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addPerson = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const { name } = req.body;

    const exists = await People.findOne({ name });
    if (exists)
      return res.status(400).json({ success: false, message: "Person already exists" });

    const newPerson = new People({ name });
    await newPerson.save();

    res.json({ success: true, person: newPerson });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
