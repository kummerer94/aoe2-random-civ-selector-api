// The API behind saving and loading configurations for AoE RCS.

const url = require("url");
const MongoClient = require("mongodb").MongoClient;

let cachedDb = null;

async function connectToDatabase(uri) {
  // Use the cached database connection if available
  if (cachedDb) {
    return cachedDb;
  }

  // Connect to the database
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  // Select the database through the connection using
  // the path in the connection string.
  const db = await client.db(url.parse(uri).pathname.substr(1));

  cachedDb = db;
  return db;
}

// This is the serverless function dealing with api requests
module.exports = async (req, res) => {
  const db = await connectToDatabase(process.env.MONGODB_CONN_STR);
  const collection = await db.collection("users");
  const users = await collection.find({}).toArray();
  res.status(200).json({ users });
};
