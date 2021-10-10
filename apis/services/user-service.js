const userRespository = require("../repositories/user-repository");

exports.insertUser = async (user) => {
  try {
    await userRespository.save(user);
  } catch (e) {
    throw e;
  }
};

exports.getUserById = async (userId) => {
  try {
   return await userRespository.getUserById(userId);
  } catch (e) {
    throw e;
  }
};
