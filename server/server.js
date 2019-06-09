import config from './../config/config';
import app from './express';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
mongoose.set('useCreateIndex', true);

app.listen(config.port, (err) => {
  if(err) console.log(err);
  console.log(`Server started on port ${config.port}`);
});
