import devBundle from './devBundle';
import express from 'express';
import path from 'path';
import template from './../template';
import { MongoClient } from 'mongodb';

const app = express();

// for development mode
devBundle.compile(app);

// serve static files from dist/folder
const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

// connect Node server to MongoDB
// MongoClient is Driver that connects 
// to implement database code in backend
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup';
MongoClient.connect(url, (err, db) => {
  console.log("Connected successfully to mongodb server");
  db.close();
});

/* @route   GET /
 * @desc    render template page
 * @access  Public
 */
app.get('/', (req, res) => {
  res.status(200).send(template());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, err => {
    if(err) console.log(err);
    console.log(`Server started on port ${PORT}`);
  }
);
