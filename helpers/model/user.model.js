const { default: mongoose } = require("mongoose");

const userModel = () => {
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  });
  return mongoose.models.User || mongoose.model('User', userSchema);
}

export const db = {
  User: userModel()
};

