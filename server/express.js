/* @desc    Express configurations
 * @import  express       
 * @import  cookieParser  parse and set cookies
 * @import  compress      compress response bodies
 * @import  cors          enable cross origin resource sharing
 * @import  helmet        secure express apps
 */

import express from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

// routes imports
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

/* @route   /api/users
 * @desc    routes related to User database
 * @access  Public
 */
app.use('/', userRoutes);

/* @route   /auth
 * @desc    routes related to authentication
 * @access  Public
 */
app.use('/', authRoutes);    


// error catching
app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError') {
    res.status(401).json({
      "error": `${err.name}: ${err.message}`
    });
  }
});

export default app;