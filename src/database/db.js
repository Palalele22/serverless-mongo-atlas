const mongoose = require("mongoose");

let conn = null;

module.exports = connectDatabase = async() => {
  if (conn === null) {
    console.log("Creating new connection to the database ...");
    conn = await mongoose.connect(process.env.DB, {
        serverSelectionTimeoutMS: 5000
    });
    return conn;
  }

  console.log("Connecting already established, reusing the connection");
};
