const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const params = require('params');
const fs = require('fs');
const User = require('../models/user');

exports.signIn = (req, res) =>{
    // if(req.session.userId){
    //     User.findById(req.session.userId).then(result =>{
    //         res.redirect('/');
    //     }).catch(err =>{
    //         console.log(err)
    //     })
    // }
    // else{
        res.render('signIn', error = false);
        console.log(error);
    // }
  
}

exports.signUp = (req, res) =>{
    res.render('signUp', errorpassword = false, errorEmail = false, errorcheckbox = false, errorEmailExist = false, errorusername = false, errorConfirmpassword = false, errorpasswordCompare = false, errorpasswordLenght = false);
}

exports.register = (req, res) =>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const checkbox = req.body.checkbox;

    errorusername = false;
    errorEmail = false;
    errorpassword = false;
    errorConfirmpassword = false;
    errorcheckbox = false;
    errorpasswordCompare = false;
    errorEmailExist = false;
    errorpasswordLenght = false;
    if(!username){
        errorusername = true
    }
    if(!email){
        errorEmail = true
    }
    if(!confirmPassword){
        errorConfirmpassword = true
    }
    if(!password){
        errorpassword = true
    }
    if(!checkbox){
        errorcheckbox = true
    }

    if(password.length<3){
        errorpasswordLenght = true;
        res.render('signUp');
    }
    else{
        const user = new User({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, 10),
            // checkbox: checkbox,
            admin: false,
        });
    
        if(confirmPassword == password){
            user.save().then(result =>{
                res.redirect('signIn');
            }).catch(err=>{
                if(err.code == 11000){
                    res.render('signUp', {errorEmailExist: true, message: '(Email is already existed or invalid!)'});
                }
                else{
                    res.render('signUp');
                }
            });
        }
        else{
            res.render('signUp', {errorpasswordCompare: true, message: '(Password and Confirm Password must be the same!)'});
        }
    }
    
}

exports.login = (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.find({email:email}).then(result=>{
        if(result.length){
            bcrypt.compare(password, result[0].password).then(isMatch=>{
                if(isMatch){
                    res.cookie('email', email, {expire: 3600*1000});
                    res.cookie('logged-time', new Date().toLocaleString(), {expire: 3600*1000});
                    req.session.userId = result[0]._id;
                    req.session.username = result[0].username;
                    req.session.admin = result[0].admin;
                    res.redirect('/');
                }
                else{
                    res.render('signIn', {error: true, message: '(Email or password is invalid!)'});
                }
            })
        }
        else{
            res.render("signIn", {error: true, message: '(Email or password is invalid!)'});
        }
    }).catch(err=>{
        console.log(err);
    });
}


       

