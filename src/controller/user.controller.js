
import usersModel from "../models/user.model.js";

import productModel from "../models/products.models.js";

export default class userController{

    getRegister(req,res){
        res.render("register");
    }

    getLogInForm(req,res){
        res.render("login",{errorMessage:null});
    }
    
  postRegisterForm(req,res){
    const {name,email,password}=req.body;
    usersModel.adduser(name,email,password);
    //after submitting new user form it shoud showss the log in form
    res.render("login",{errorMessage:null});
  }

  postLogInForm(req,res){
    const {email,password}=req.body;
    const user=usersModel.isValidUser(email,password);

    if(!user){
      return  res.render("login",{errorMessage:"invalid credentials"});
    }
     req.session.userEmail=email;
    let products = productModel.getData();

    return res.render("products", { products,userEmail:req.session.userEmail });
  }

  logout(req,res){
    //on log out destroy the session
    req.session.destroy((err)=>{
      if(err){
        console.log(err);
      }else{
        res.redirect("/login");
      }
    })
    res.clearCookie("lastVisit");
  }
}