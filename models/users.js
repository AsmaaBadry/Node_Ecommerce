const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, validate: {
      validator: function (v) {
        return /^[a-zA-Z]{3,8}(@)(gmail|yahoo|outlook)(.com)$/.test(v);
      },
      message: (props) => {
        console.log(props);
        return `${props.value} is not a valid email!`;
      },
    },
  },
  password: {
    type: String, required: true, validate: {
      validator: function (v) {
        return /\d{3}/.test(v);
      },
      message: (props) => {
        console.log(props);
        return `${props.value} is not a valid password!`;
      },
    },
  },
  role: { type: String, enum: ["User", "Seller", "Admin"], default: "user" }
},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
