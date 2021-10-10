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
    await dynamoDbClient.put(params).promise();
  } catch (e) {
    console.error(e);
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
  console.log(`Get user by id for user ${userId}`);
  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    return Item;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
