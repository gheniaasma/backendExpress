const Joi = require("joi");
var db = require("../models");
const config = require("../config/auth.config.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const schemavalidation = Joi.object({
  username: Joi.string().required(),
  cin: Joi.number().required(),
  datenaiss: Joi.string().required(),
  rib: Joi.number().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

exports.register = (username, cin, datenaiss, rib, email, password) => {
  return new Promise((resolve, reject) => {
    let validation = schemavalidation.validate({ username, cin, datenaiss, rib, email, password });
    if (validation.error) {
      reject(validation.error.details[0].message);
    }
    db.User.count({ where: { email: email } }).then((doc) => {
      if (doc != 0) {
        reject("email existe déjà");
      }
      {
        bcrypt.hash(password, 10).then((hashedPassword) => {
          db.User.create({
            username: username,
            cin: cin,
            datenaiss: datenaiss,
            rib: rib,
            email: email,
            password: hashedPassword,
          })
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              console.log(err.message);

            });
        });
      }
    });
  });
};

exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    db.User.findOne({ where: { email: email } }).then((user) => {
      if (!user) {
        reject("email et mot de passe incorrects");
      }
      {
        {
          bcrypt.compare(password, user.password).then((same) => {
            if (same) {
              let token = jwt.sign(
                { id: user.id, nom_user: user.id, role: "userrole" },
                config.secret,
                { expiresIn: "360h" }
              );
              resolve(token);
            } else {
              reject("email et mot de passe incorrects");
            }
          });
        }
      }
    });
  });
};

exports.current = () => {
  return new Promise((resolve, reject) => {
    resolve("ok");
  });
};
