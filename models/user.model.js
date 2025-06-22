import mongoose from "mongoose";
import validator from "validator";
import userRoles from '../utils/userRoles.js';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: true,
  },
    // token: {
  //     type: String,
  // },
  role: {
    type: String, 
    enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANGER],// ["USER", "ADMIN", "MANGER"] just this values
    default: userRoles.USER,
  },
    avatar: {
        type: String,
        default: 'uploads/profile.png'
    }
}, {
  versionKey: false,
});

const User = mongoose.model("User", userSchema);

export default User;
