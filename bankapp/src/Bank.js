import axios from 'axios';
const baseUrl = "http://localhost:4000";
let data={
    test1:{username:"test1",password:"test1",acno:1001,balance:60000,history:[]},
    test2:{username:" test2",password:"priya123",acno:1002,balance:40000,history:[]},
    test3:{username:"test3",password:"kavya123",acno:1003,balance:30000,history:[]},
    test4:{username:"test4",password:"nidi123",acno:1004,balance:90000,history:[]},
};
let newData=localStorage.getItem("data");
if(newData){
    data=JSON.parse(newData);
}

class Bank{
    static currentUser="";
   
    static saveData(){
        localStorage.setItem("data",JSON.stringify(data));
    }
   static getAccountDetails(){
        
        return data;
    }
    static setCurrentUser(username){
        localStorage.setItem("currentUser",username);
              
    }

    static getCurrentUser(){
        return localStorage.getItem("currentUser");
              
    }
    static addUser(username,password,acno){
        data[username] = {username,password,acno,history:[],balance:0};
        Bank.saveData();
    }
    static getHistory(){
        return data[Bank.getCurrentUser()].history;
    }
   static deleteUser(username)
   {
       delete data[username];
   }

   static login(username,password){
       return axios.post(baseUrl+"/users/login",{
           username,
           password
       }, { withCredentials:true })
   }

   static registration(username,password,confirmpassword,acno){
    return axios.post(baseUrl+"/users/register",{
        username,
        password,
        confirmpassword,
        acno
    })
}
static deposit(username,amount){
    return axios.post(baseUrl+"/users/deposit",{
        username,
       amount
    },{withCredentials:true })
}
static withdraw(username,amount){
    return axios.post(baseUrl+"/users/withdraw",{
        username,
       amount
    },{withCredentials:true })
} 
static history(){
    return axios.get(baseUrl+"/users/transactionhistory",
        
{withCredentials:true })
} 

static getUsers(){
      
    return axios.get(baseUrl+"/users",
    {withCredentials:true});
}

}
export default Bank;