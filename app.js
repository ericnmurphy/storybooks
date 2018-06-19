const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

//load user model
require('./models/User');

//passport config
require('./config/passport')(passport);

//load routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

//map global promises
mongoose.Promise = global.Promise;

//mongoose connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express();

//handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//use routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});