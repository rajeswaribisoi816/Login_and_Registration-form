const express = require("express");
const { route } = require(".");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const { forwardAuthenticated } = require('../config/auth');

const Registers = require("../models/schema");

//login page
router.get("/login", forwardAuthenticated, (req, res) => {
    res.render("login");
})

//get register page
router.get("/register", forwardAuthenticated, (req, res) => {
    res.render("register");
})

router.post("/register", async (req,res) => {
    try{
        const {firstname, lastname, email, gender, password, password2, phone} = req.body;
        let errors = [];
        if (!firstname || !lastname || !gender || !email || !password || !password2) {
            errors.push({ msg: 'Please enter all fields' });
          }
        
          if (password != password2) {
            errors.push({ msg: 'Passwords do not match' });
          }
        
          if (password.length < 6) {
            errors.push({ msg: 'Password must be at least 6 characters' });
          }
          if (errors.length > 0) {
            res.render('register', {
              errors,
              firstname,
              lastname,
              gender,
              email,
              phone,
              password,
              password2
            });
          }else{
            Registers.findOne({ email: email }).then(user => {
                if (user) {
                    errors.push({ msg: 'Email already exists' });
                    res.render('register', {
                        errors,
                        firstname,
                        lastname,
                        gender,
                        email,
                        phone,
                        password,
                        password2
                    });
                }else{
                    const newUser = new Registers({
                        errors,
                        firstname,
                        lastname,
                        gender,
                        email,
                        phone,
                        password,
                    })
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save().then(user => {
                                req.flash('success_msg', 'You are now registered and can log in');
                                res.redirect('/login');
                            })
                            .catch(err => console.log(err));
                        })
                    })
                }
            })
        }
    }catch(err){
        res.status(400).send(err);
    }
})
// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  });
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
module.exports = router;