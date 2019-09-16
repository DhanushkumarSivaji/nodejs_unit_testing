const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb://Dhanush1995:S*dk1995@ds251799.mlab.com:51799/nodejs_unit_testing",
      { useNewUrlParser: true }
    );
  } catch (err) {
    console.error("Error connecting to mongodb");
    console.error(err);
  }
}

module.exports = { connect };