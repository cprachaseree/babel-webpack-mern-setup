/*
 * @file controller methods for user routes
 * @import  UserSchema models import
 * @import lodash javascript utility to manipulate arrays and objects
 */

import User from '../models/user.model';
import _ from 'lodash';
//import errorHandler from './error.controller';

/* @desc    create user 
 * @route   POST /api/users
 * @return  JSON message
 */ 
const create = (req, res, next) => {
  const { name, email, password } = req.body;
  
  if(!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all the fields" });
  }

  const newUser = new User({
    name,
    email,
    password
  });

  newUser.save((err, result) => {
    if(err) {
      return res.status(400).json({ 
        error: "Signed up failed",
        err 
      });
    }
    res.status(200).json({ 
      message: "Successfully signed up!"
    });
  });
};

/* @desc    list all users
 * @route   GET /api/users 
 * @return  JSON objects as array
 */ 
const list = (req, res) => {
  User.find((err, users) => {
    if(err) {
      return res.status(400).json({ 
        error: "list users fail"
      });
    }
    res.json(users);
  }).select('name email updated created.');
};

/* @desc    controller function to query database by id
 * @return  control to next relevant function
 */ 
const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || ! user) {
      return res.status(400).json({
        error: "User not found."
      });
    }
    req.profile = user;
    next();
  });
};

/* @desc    read single user's data 
 *          removes sensitive information before sending user object
 * @route   GET /api/users/:userId 
 * @return  JSON object of user without password and salt
 */ 
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

/* @desc    update a single user with id userId
 * @route   PUT /api/users/:userId 
 * @return  JSON object of updated user
 */ 
const update = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save((err) => {
    if(err) {
      return res.status(400).json({
        error: "Update user failed"
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

/* @desc    delete a single user with id userId
 * @route   DELETE /api/users/:userId 
 * @return  JSON object of deleted user
 */ 
const remove = (req, res, next) => {
  const user = req.profile;
  user.remove((err, deletedUser) => {
    if(err) {
      return res.status(400).json({
        error: "Delete user fail"
      });
    }
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  });
};

export default {
  create,
  userByID,
  read,
  list,
  remove,
  update
};