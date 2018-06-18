const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//load user model
require('./models/User');

//passport config
require('./config/passport')(passport);

//load routes
const auth = require('./routes/auth');

//map global promises
mongoose.Promise = global.Promise;

//mongoose connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express();

app.get('/', (req, res) => {
  res.send('It works!');
});

//use routes
app.use('/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});