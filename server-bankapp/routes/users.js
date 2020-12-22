var express = require('express');
const bank = require('../services/bank');
var router = express.Router();
var Bank = require('../services/bank');



function authMiddleware(req,res,next){
  console.log("authmiddleware");
  if(Bank.getCurrentUser()){
    next();
  }
  else{
    res.send({message:"User not authenticated"});
  }
}

/* GET users listing. */

router.get('/', function(req, res) {
 Bank.getUsers()
 .then(data=>{
   res.status(data.statusCode).send({message:data.message,users:data.users});
 });
});


router.post('/register',function(req, res) {
  let usname=req.body.username;
  let pwd=req.body.password;
  let acno=req.body.acno;
  let confirmpassword=req.body.confirmpassword;
  //let data=Bank.getUsers();
  // if(usname in data){
  //   res.status(400).send({message:"user already exist.Please login"});
  // }else 
  if(pwd!=confirmpassword){
    res.status(400).send({message:"password and confirm password doesnot match"});
  }
  else{
    Bank.addUser(usname,pwd,acno)
    .then(data=>{
      res.status(data.statusCode).send({message:data.message});
    } )
   
  }

});
router.delete('/',function(req,res){
  Bank.deleteUser(req.body.username)
  .then(data=>{
    res.status(data.statusCode).send({message:data.message})
  })
});
router.post('/login',function(req, res) {
  let usname=req.body.username;
       let pwd=req.body.password;
       //let data=Bank.getUsers();
       Bank.login(usname,pwd)
       .then(data=>{
         if(data.statusCode==200){
           req.session.currentUser=usname;
         }
         res.status(data.statusCode).send({message:data.message})
       })
      //  if(usname in data)
      //   {

      //       let password=data[usname]["password"];
      //       if(pwd==password)
      //       {
      //         req.session.currentUser=usname;
      //           Bank.setCurrentUser(usname);
      //           res.send({message:"Login success"});
      //       }
      //       else
      //       {
      //         res.status(400).send({message:"you provide invalid message"});
        //     }
        // }
        // else{
        //     res.status(400).send({message:"invalid user"});
        // }

});

router.post('/deposit',function(req, res) {
  let uname = req.body.username;
  let amt = Number(req.body.amount);
  Bank.deposit(uname,amt) 
  .then(data=>{  
    res.status(data.statusCode).send({message:data.message,balance:data.balance})
  })
  // let data = Bank.getUsers();
  //   if (uname in data) {

  //     data[uname]["balance"] += amt;
  //     let bal = data[uname]["balance"];
     
  //     data[uname]["history"].push({
  //         typeOfTransaction:"Credit",
  //         amount:amt
  //     })
     
  //     res.send({balance:bal,message:"Deposit succcessful"});
  // }
  // else {
  //   res.status(400).send({message:"invalid user"});
  // }

});

router.post('/withdraw',function(req,res) {
  let uname = req.body.username;
  let amt = Number(req.body.amount);
  if(uname!=req.session.currentUser){
    return res.status(400).send({message:"invalid user"});
  }
  Bank.withdraw(uname,amt)
  .then(data=>{
    res.status(data.statusCode).send({message:data.message,balance:data.balance});
  })
  // let data = Bank.getUsers();
  // if (uname in data) {
  //     if(uname!=req.session.currentUser)
  //     {
  //       return res.status(400).send({message:"Invalid user"});
  //     }
  //     if(amt>data[uname]["balance"]){
  //       return res.status(400).send({message:"Insufficient balance"})
  //     }
      
  //         data[uname]["balance"] -= amt;
  //         let bal = data[uname]["balance"];
  //         data[uname]["history"].push({
//               typeOfTransaction:"Debit",
//               amount:amt
//           })
         
//           res.send({balance:bal,message:"withdraw successful"});
//       }
  
//   else {
//       res.status(400).send({message:"invalid user"});
//   }
 } )

router.get('/transactionhistory',function(req,res){
  let data=Bank.getUsers();
  let uname=req.session.currentUser;
  if(uname in data){
    return res.send({history:data[uname].history});

  }
  else{
    res.status(400).send({message:"invalid user"})
  }
})
module.exports = router;

