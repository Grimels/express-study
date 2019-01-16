var express = require('express');
var router = express.Router();
const createError = require('http-errors');

const { registerUser, tryToLogIn, getUser } = require('../managers/users');

const checkAuth = (req, res, next) => {
  if (req.session['userId']) {
    next();
  } else {
    next(createError(401));
  }
};

const mainPage = (req, res) => {
  getUser(req.session.userId).then(user => {
    console.log(user);

    const text = `Your name: ${user.name}. Your email: ${user.email}`;
    res.send(text);
  });
};

/* GET users listing. */
router.get('/', checkAuth, mainPage);

router.get('/login', (req, res) => {
  res.render('loginPage');
});

router.post('/login', (req, res) => {
  tryToLogIn(({ email, password } = req.body)).then(loginUserId => {
    if (loginUserId) {
      req.session.userId = loginUserId;
      res.redirect('/users');
    } else {
      res.redirect('/users/login');
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.userId = null;
  res.redirect('/users/login');
});

router.post('/', (req, res, next) => {
  if (req.body.password !== req.body.password_conf)
    next(createError(401, 'Invalid password confirmation'));
  registerUser(req.body)
    .then(user => {
      req.session.userId = user.attributes.id;
      res.status(200).send(user);
    })
    .catch(err => next(err));
});

module.exports = router;
