const { MongoClient } = require("mongodb");
require("dotenv").config();
const { BOOKSTORE } = require("../database/BOOKSTORE");

let dbConnection;

const url = `${process.env.MONGODB_URL}/bookstore`;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(url)
      .then((client) => {
        dbConnection = client.db();

        return cb();
      })
      .catch((err) => {
        console.log(err);
        connectToDb;
        return cb(err);
      });
  },
  getDb: () => dbConnection,
  seedDB: (cb) => {
    MongoClient.connect(url)
      .then((client) => {
        dbConnection = client.db();
        dbConnection.collection("books").deleteMany({});
        dbConnection.collection("books").insertMany(BOOKSTORE);

        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
};
