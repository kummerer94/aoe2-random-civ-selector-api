// The API behind saving and loading configurations for AoE RCS.

const connectToDatabase = require("./_database").connectToDatabase;

// This is the serverless function dealing with api requests
module.exports = async (req, res) => {
  // Take care of CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { user } = req.query;
  try {
    req.body;
  } catch (error) {
    return res.status(400).json({ error: "Could not parse your input." });
  }
  if (user === undefined || user === "") {
    res.status(400).json({ error: "No user given." });
  } else {
    if (
      req.body === "" ||
      req.body === undefined ||
      req.body === null ||
      !(req.body instanceof Object)
    ) {
      return res.status(400).json({ error: "Malformed body." });
    }
    const db = await connectToDatabase(process.env.MONGODB_CONN_STR);
    const collection = await db.collection("configurations");
    saveResult = await collection.insertMany([
      {
        user,
        inserted: new Date(),
        civilizations: req.body,
      },
    ]);
    res.status(200).json({ status: "Inserted your document." });
  }
};
