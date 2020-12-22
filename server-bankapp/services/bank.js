
const { User } =  require("../models/user");


const { get, use } = require("../routes/users");

let data={
    
}
let currentUser;
function getUsers(){
    return User.find({}).select("username history")
    .then(users=>{
        return {
            statusCode:200,
            users:users
        }
    })
}

function addUser(username,password,acno){
    return User.findOne({
        username
    })
    .then(user=>{
        if(user){
            return {
                statusCode:400,
                message:"Account already exists"
            }
        }
        const newUser = new User({
           username, password, acno, history:[], balance:0 
        });
        newUser.save();
        return {
            statusCode:200,
            message:"Account created successfully"
        }
    })
    //data[username]={username,password,acno,history:[],balance:0};

}

function login(username,password){
    return User.findOne({
        username,
        password
    })
    .then(user=>{
        if(user){
            return {
                statusCode:200,
                message:"Logged in successfully"
            };
        }
        return {
            statusCode:400,
            message:"Invalid credentials"
        }
    })
    
}
function deposit(username,amount){
    return User.findOne({
        username
    })
    .then(user=>{
        if(user){
            user.balance+=amount
            let bal=user.balance;
            user.history.push({
                typeOfTransaction:"credit",
                amount:amount
            });
            user.save();
            return {statusCode:200, balance:bal, message:"deposit successful"}
        }
        return {
            statusCode:400,
            message:"Invalid credentials"
        }
    })

}
function withdraw(username,amount){
    return User.findOne({
        username
    })
    .then(user=>{
        if(user){
            if(amount>user.balance){
                return {statusCode:400,balance:user.balance,message:"insufficient balance"}
            }
            user.balance-=amount
            let bal=user.balance;
            user.history.push({
                typeOfTransaction:"Debit",
                amount:amount
            });
            user.save();
            return {statusCode:200,balance:bal,message:"withdraw successful"}
        }
        return {
            statusCode:400,
            message:"Invalid credentials"
        }
    })


}
function deleteUser(username){
  return User.deleteOne({
      username
  }).then(data=>{
      return { statusCode:200,message:"user deletion successfull"}
  })

}

function setCurrentUser(username){
    currentUser=username;

}
function getCurrentUser(){
    return currentUser;
}
module.exports={
   getUsers,
   addUser,
   login,
   deposit,
   withdraw,
   deleteUser,
    //setCurrentUser:setCurrentUser,
    getCurrentUser:getCurrentUser
    
}