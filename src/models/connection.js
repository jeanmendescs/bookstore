const { MongoClient } = require("mongodb");
require("dotenv").config();

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
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
