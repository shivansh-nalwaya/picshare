const bcrypt = require("bcrypt-nodejs");
var User = require("../models/UserModel");

module.exports = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      User.findOne({ email })
        .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
            user.generateToken();
            resolve(user);
          } else reject("Invalid password!");
        })
        .catch(err => {
          console.log(err);
          reject("Invalid email!");
        });
    });
  },

  create: data => {
    var user = new User(data);
    return new Promise((resolve, reject) => {
      user
        .save()
        .then(user => {
          resolve(user);
        })
        .catch(() => {
          reject("Unable to sign up!");
        });
    });
  },

  update: (id, data) => {
    return User.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...data }
      }
    );
  },

  delete: id => {
    return User.deleteOne({ _id: id });
  }
};