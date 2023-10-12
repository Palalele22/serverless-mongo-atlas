const connectionDatabase = require("../database/db");
const User = require("../models/user");

module.exports.handler = async (event, context) => {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectionDatabase();

    userObj = await User.find();
    return {
      statuscCode: 200,
      body: JSON.stringify(userObj),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
