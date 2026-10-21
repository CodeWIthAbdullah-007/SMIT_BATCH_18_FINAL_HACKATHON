
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

async function connectToMongoDB() {
  await client.connect();
  console.log("MongoDB Atlas connected successfully!");

  return client;
}

function getDB() {
  return client.db("auth-system");
}

module.exports = { connectToMongoDB, getDB, client };
