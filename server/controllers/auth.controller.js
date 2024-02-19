const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const { User } = require("../models/index");

const handleCreateAndRegisterUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;
  const usernamePresentInDB = await User.find({ username });
  const emailAlreadyInUsed = await User.find({ email });
  if (usernamePresentInDB) {
    return next(new ErrorHandler("username already in use", 500));
  }
  if (emailAlreadyInUsed) {
    return next(new ErrorHandler("email already in use", 500));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    avatar: {
      public_id: "random_string",
      url: "url",
    },
  });

  res.status(201).json({ user });
});


module.exports = handleCreateAndRegisterUser;