// Connect to a MongoDB database.

const MongoClient = require("mongodb").MongoClient;

let cachedDb = null;

async function connectToDatabase(uri) {
  // Use the cached database connection if available
  if (cachedDb) {
    return cachedDb;
  }

  // Connect to the database
  const client = await MongoClient.connect(uri);

  // Select the database given in the path of the connection string.
  const db = client.db();

  cachedDb = db;
  return db;
}

module.exports.connectToDatabase = connectToDatabase;
