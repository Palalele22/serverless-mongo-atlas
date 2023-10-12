const connectionDatabase = require("../database/db");
const User = require("../models/user");

module.exports.handler = async (event, context) => {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectionDatabase();
    const { email } = event.pathParameters;
    userObj = await User.findOne({ email });

    if (userObj) {
      return {
        statuscCode: 200,
        body: JSON.stringify(userObj),
      };
    } else {
      return {
        statuscCode: 404,
        body: JSON.stringify({
          error: "Requested resource is not found in the database",
        }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
