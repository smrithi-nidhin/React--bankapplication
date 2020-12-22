import React from 'react';
import { withRouter } from 'react-router';
import Bank from './Bank';
class Users extends React.Component{
    state={
        users:[]
    }
    deleteUser(username){
        Bank.deleteUser(username);
        this.setState({});
    }
    componentDidMount(){
        Bank.getUsers()
        .then(response=>{
            this.setState({
                users:response.data.users
            });
        });
    }
    render(){
        //let users = Bank.getUsers();
        return (<div className="container">
            <h1>Users</h1>
            <table class="table">
                <tr>
                    <th>Username</th>
                    <th>balance</th>
                    
                </tr>
                
                    {
                     this.state.users.map(user=><tr>
                            <td>{user.username}</td>
                            <td>{user.balance}</td>
                            <td onClick={()=>{this.deleteUser(user)}}>Delete</td>
                        </tr>)
                    }
                
            </table>
        </div>
        )
    }
    

}
export default withRouter(Users);