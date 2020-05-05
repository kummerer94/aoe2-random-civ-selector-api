// The API behind saving and loading configurations for AoE RCS.

const connectToDatabase = require("../database").connectToDatabase;

// This is the serverless function dealing with api requests
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  const { user } = req.query;
  try {
    req.body;
  } catch (error) {
    return res.status(400).json({ error: "Could not parse your input." });
  }
  if (user === undefined || user === "") {
    res.status(400).json({ error: "No user given." });
  } else {
    const db = await connectToDatabase(process.env.MONGODB_CONN_STR);
    const collection = await db.collection("configurations");
    await collection.insert({
      user,
      inserted: new Date(),
      civilizations: req.body,
    });
    res.status(200).json({ status: "Inserted your document." });
  }
};
