const connectionDatabase = require("../database/db");
const User = require("../models/user");

module.exports.handler = async (event, context) => {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectionDatabase();
    const { name, email, password } = JSON.parse(event.body);
    let userObj = {
      name,
      email,
      password,
    };
    userObj = await User.create(userObj);
    return {
      statuscCode: 201,
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
