// The API behind saving and loading configurations for AoE RCS.

const connectToDatabase = require("../database").connectToDatabase;

// This is the serverless function dealing with api requests
module.exports = async (req, res) => {
  const { user = "standard" } = req.query;
  const db = await connectToDatabase(process.env.MONGODB_CONN_STR);
  const collection = await db.collection("configurations");
  const configurations = await collection
    .find({ user })
    .sort({ inserted: -1 })
    .limit(1)
    .toArray();
  res.status(200).json(configurations);
};
