/*
 * @file    handle signin/out routes with authentication and authorization of protected users
 * @import
 * @import
 */

import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from './../../config/config';
import { runInNewContext } from 'vm';

/* @desc    signin user declared
 * @route   POST /auth/signin
 * @return  JSON user object with authorization token
 */ 
const signin = (req, res) => {
  // search database for user
  User.findOne({
    "email": req.body.email
  }, (err, user) => {
    if(err || !user) {
      return res.status(401).json({ 
        error: "User not found."
      });
    }
    if(!user.authenticate(req.body.password)) {
      return res.status(401).json({
        error: "Incorrect email or password."
      });
    }
    
    // generate JWT secret key
    const token = jwt.sign({
      _id: user._id
    }, config.jwtSecret);

    res.cookie("t", token, {
      expire: new Date() + 9999
    });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  });
};

/* @desc    signout user declared
 * @route   GET /auth/signout
 * @return  JSON user object
 */ 
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Signed out."
  });
};

/* @desc    check if valid JWT and is signed in
 * @route   None
 * @return  If the token is valid, it appends the verified user's ID in an 'auth' key to the request object, 
 *          otherwise it throws an authentication error.
 */
const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
});

/* @desc    check if signed in users are authorized to conduct the following actions
 * @route   None
 * @return  JSON user object
 */
const hasAuthorization = (req, res, next) => {
  const authorized = eq.profile && req.auth && req.profile._id == req.auth._id;
  if(!authorized) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization
};