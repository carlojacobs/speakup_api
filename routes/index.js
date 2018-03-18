const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('user');

/* GET home page. */
router.post('/add', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  // Validation
  req.checkBody('name', 'A name is required.').notEmpty();
  req.checkBody('email', 'A email is required.').notEmpty();

  req.getValidationResult().then((result) => {
    if (result.isEmpty() == false) {
      // Throw validationresult error
      result.array().forEach((error) => {
        res.status(200).json({message: error.msg});
      });
    } else {
      User.findOne({email: email}, (err, user) => {
        if (err) {
          console.log(err);
        }
        if (user) {
          res.status(200).json({message: 'This email has already been used.', success: false});
        } else {
          const newUser = User({
            name: name,
            email: email
          });
          newUser.save().then(() => {
            res.status(200).json({message: 'Successfully added user', success: true});
          });
        }
      });
    }
  });
});

router.get('/num', (req, res) => {
  User.find((err, users) => {
    if (err) {
      console.log(err);
    }
    if (users) {
      const length = users.length;
      res.status(200).json({num: length});
    }
  });
});

router.get('/all', (req, res) => {
  User.find((err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({users});
    }
  });
});

module.exports = router;
