// The API behind saving and loading configurations for AoE RCS.

const connectToDatabase = require("./_database").connectToDatabase;

// This is the serverless function dealing with api requests
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { user = "standard" } = req.query;
  try {
    const db = await connectToDatabase(process.env.MONGODB_CONN_STR);
    const collection = await db.collection("configurations");
    const cursor = collection
      .find({ user: user })
      .sort({ inserted: -1 })
      .limit(1);
    let configurations = await cursor.toArray();
    if (configurations.length == 1) {
      configurations = configurations[0];
    }
    res.status(200).json(configurations);
  } catch (error) {
    // Answer with the CORS header set above, so that the browser shows
    // this error and not a CORS error.
    console.error(error);
    res.status(503).json({ error: "The database is not available." });
  }
};
