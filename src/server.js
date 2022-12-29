const app = require("./app");
require("dotenv").config();
const { connectToDb } = require("./models/connection");

const PORT = process.env.PORT || 5000;

connectToDb((err) => {
  if (!err) {
    app.listen(5000, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});
