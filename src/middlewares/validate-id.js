const { ObjectId } = require("mongodb");

function validateId(id) {
  if (!ObjectId.isValid(id)) {
    return { error: "Not a valid doc id" };
  }
}

module.exports = {
  validateId,
};
