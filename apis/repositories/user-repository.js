const AWS = require("aws-sdk");
const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

exports.save = async (user) => {
  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: user.userId,
      name: user.name,
    },
  };
  try {
    return await dynamoDbClient.put(params).promise();
  } catch (e) {
    console.error(
      `Error occured while saving user with user ${params}, error: ${e}`
    );
    throw e;
  }
};

exports.getUserById = async (userId) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: userId,
    },
  };
  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    return Item;
  } catch (e) {
    console.error(
      `Error occured while fetching user with userId ${userId}, error: ${e}`
    );
    throw e;
  }
};
