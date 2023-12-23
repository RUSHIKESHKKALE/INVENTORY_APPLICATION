import dotenv from 'dotenv';
dotenv.config();
import express from "express";

import productController from "./src/controller/product.controller.js";

import path from "path";

import ejsLayouts from "express-ejs-layouts";

import validateRequest from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";

import userController from "./src/controller/user.controller.js";

import session from "express-session";

import { auth } from "./src/middlewares/auth.middleware.js";

import cookieparser from "cookie-parser";

import { setLastVisit } from "./src/middlewares/lastVisite.middleware.js";

const PORT=process.env.PORT ||3200;

const server = express();

//parse form data
server.use(express.urlencoded({ extended: true }));

server.use(cookieparser());
//server.use(setLastVisit);
//setup view engines settings
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);
//create a instance of productController
const productcontroller = new productController();
//create a instance of userController
const usercontroller = new userController();

//configure session middleware
server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

server.use(express.static("public"));

server.get("/", auth, setLastVisit, productcontroller.getProduct);
//server.use(express.static("src/veiws"));

server.get("/new", auth, productcontroller.getAddForm);

server.post(
  "/",
  auth,
  uploadFile.single("img"),
  validateRequest,
  productcontroller.addNewProduct
);

server.get("/update-product/:id", auth, productcontroller.getUpdateView);

server.post("/update-product", auth,uploadFile.single("img"),validateRequest, productcontroller.postUpdateProduct);

server.post("/delete-product/:id", auth, productcontroller.deleteProduct);

server.get("/register", usercontroller.getRegister);

server.get("/login", usercontroller.getLogInForm);

server.post("/register", usercontroller.postRegisterForm);

server.post("/login", usercontroller.postLogInForm);

server.get("/logout", usercontroller.logout);

server.listen(3300, () => {
  console.log(`server start listening on ${PORT}`);
});
