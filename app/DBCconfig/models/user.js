const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const models = mongoose.models;

// define the Schema (the structure of the article)
const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

// Create a model based on that schema
const UserModal = models.User || mongoose.model("User", UserSchema);

// export the model
module.exports = UserModal;
