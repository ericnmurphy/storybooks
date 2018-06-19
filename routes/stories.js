const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('stories/index');
});

router.get('/add', (req, res) => {
  res.render('stories/add');
});

module.exports = router;