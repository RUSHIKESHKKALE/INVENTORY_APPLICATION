export default class usersModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  //for new user registration
  static adduser(name, email, password) {
    const newUser = new usersModel(users.length + 1, name, email, password);
    users.push(newUser);
  }

  //for chacking user exist already or not for log in post request
  static isValidUser(email,password){
    const result=users.find((u)=>u.email==email && u.password==password);
    return result;
  }
}

var users = [];
