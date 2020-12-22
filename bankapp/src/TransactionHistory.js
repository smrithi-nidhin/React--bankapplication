import React from 'react';
import { withRouter } from 'react-router';
import Bank from './Bank';

class TransactionHistory extends React.Component{
    state = {
        history:[]
    }
    
    render(){
       // let history = Bank.getHistory();
        return(
            <div className="container">
                <h1>Transaction History</h1>
                <table class="table">
                    <tr>
                    <th>Type of trnsaction</th>
                    <th>Amount</th>
                    </tr>
                    {
                        this.state.history.length==0?
                        <tr><td>no data</td></tr>:null
                    }
                        {
                            this.state.history.map(h=><tr>
                                <td>{h.typeOfTransaction}</td>
                                <td>{h.amount}</td>
                                </tr>
                                )
                        }
                    
                    

                </table>

            </div>
        )
    }

    componentDidMount(){
         Bank.history().then(response=>{
             this.setState({history:response.data.history})
         })
    }
}

export default withRouter(TransactionHistory);
