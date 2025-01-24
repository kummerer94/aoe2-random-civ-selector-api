// Connect to a MongoDB database.

const url = require("url");
const MongoClient = require("mongodb").MongoClient;

let cachedDb = null;

async function connectToDatabase(uri) {
  // Use the cached database connection if available
  if (cachedDb) {
    return cachedDb;
  }

  // Connect to the database
  const client = await MongoClient.connect(uri);

  // Select the database through the connection using
  // the path in the connection string.
  const db = await client.db(url.parse(uri).pathname.substr(1));

  cachedDb = db;
  return db;
}

module.exports.connectToDatabase = connectToDatabase;
