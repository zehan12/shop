const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  firstName: { type: String, require: true, maxLength: 40 },
  lastName: { type: String, require: true, maxLength: 50 },
  email: {
    type: String,
    minlength: 7,
    unique: true,
    required: [true, "Email is required."],
    lowercase: true,
    maxLength: 64,
    index: true,
    validate: {
      validator: (email) => {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
      },
      message: (props) => `${props.value} is not in correct format !!`,
    },
  },
  password: {
    type: String,
    required: [true, "password required !!"],
    minLength: [9, "password is too short !!"],
    maxLength: 20,
    select: false,
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required."],
    lowercase: true,
    minlength: 4,
    maxLength: 30,
    validate: {
      validator: (username) => {
        const regex = /^[a-z]+_?[a-z0-9]{1,}?$/gi;
        return regex.test(username);
      },
      message:
        "Username Must precede with letters followed by _ or numbers eg: john23 | john_23",
    },
  },
  isEmailValidated: {
    type: Boolean,
    default: false,
  },

  contactNumber: { type: String },
  info: {
    bio: {
      type: String,
      maxLength: 200,
      default: "",
    },
    birthday: {
      type: Date,
    },
    gender: {
      type: String,
      default: "unspecified",
      enum: ["male", "female", "unspecified"],
    },
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  isAdmin: { type: Boolean, required: true, default: false },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: { type: String, required: true },
  },
  status: {
    type: Number,
    default: 1, // 1 OK | 2 Warning | 3 Blocked | 4 Ban
  },
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
  ],

  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  history: [
    {
      date: Date,
      paid: { type: Number, default: 0 },
      // items: { type: Schema.Types.ObjectId, ref: '' },
    },
  ],
  dateJoined: {
    type: Date,
    default: Date.now,
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});


userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.verifyPassword = async function (password) {
  try {
    var result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    return error;
  }
};

userSchema.methods.signToken = async function () {
  const payload = { id: this._id, email: this.email, name: this.name };
  try {
    const token = jwt.sign(payload, config.jwt.secret);
    return token;
  } catch (error) {
    return error;
  }
};

userSchema.methods.userJSON = function (token) {
  return {
    email: this.email,
    token: token,
    id: this._id,
    avatar: this.avatar,
  };
};

module.exports = mongoose.model("User", userSchema);
