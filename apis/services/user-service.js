const userRespository = require("../repositories/user-repository");
const UserAlreadyExistError = require("../errors/UserAlreadyExistError");

exports.insertUser = async (user) => {
  try {
    const existingUser = await userRespository.getUserById(user.userId);
    if (existingUser) {
      throw new UserAlreadyExistError(`User already exist with id ${user.userId}`);
    } else {
      const res = await userRespository.save(user);
    }
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
