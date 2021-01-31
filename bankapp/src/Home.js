import React from 'react';
import swal from 'sweetalert';
import Bank from './Bank';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup  from 'yup';
const DepositSchema = Yup.object().shape({
    dpusername:Yup.string()
    .min(2,'Too short')
    .max(20,'Too long')
    .required('Required'),
    dpamount:Yup.string()
    .min(2,'Too short')
    .max(20,'Too long')
    .required('Required')
   
});
const withdrawalSchema = Yup.object().shape({
   
    wdusername:Yup.string()
    .min(2,'Too short')
    .max(20,'Too long')
    .required('Required'),
    wdamount:Yup.string()
    .min(2,'Too short')
    .max(20,'Too long')
    .required('Required')
});

class Home extends React.Component {
    state = {
       
        balance: ""
    }

    // dpUsernameChange = (event) => {
    //     this.setState({ dpusername: event.target.value });
    // }
    // dpAmountChange = (event) => {
    //     this.setState({ dpamount: event.target.value });
    // }


    // wdUsernameChange = (event) => {
    //     this.setState({ wdusername: event.target.value });
    // }
    // wdAmountChange = (event) => {
    //     this.setState({ wdamount: event.target.value });
    // }
    // onDeposit = (event) => {
    //     event.preventDefault();
    //     let uname = this.state.dpusername;
    //     let amt = Number(this.state.dpamount);
    //    Bank.deposit(uname,amt)
    //    .then(response=>{
    //        this.setState({balance:response.data.balance})
    //        swal("success","deposit successfull","success")
    //    }).catch(err=>{
    //        swal("deposit failed","U provide invalid data","error")
    //    })
      

    // }

    onDeposit = (values)=>{
        console.log(values);
            let uname=values.dpusername;
          let amt=values.dpamount;
    Bank.deposit(uname,amt)
         .then(response=>{
            this.setState({balance:response.data.balance})
            swal("success","deposit successfull","success")
           //this.props.history.push("/home");
            })
             .catch(error=>{
                swal("deposit failed","U provide invalid data","error")
            });
        }
    
        



    // onWithdraw = (event) => {
    //     event.preventDefault();
    //     let uname = this.state.wdusername;
    //     let amt = Number(this.state.wdamount);
    //     Bank.withdraw(uname,amt)
    //     .then(response=>{
    //         this.setState({balance:response.data.balance})
    //         swal("success","withdraw successfull","success")
    //     }).catch(err=>{
    //         swal("withdraw failed","U provide invalid data","error")
    //     })


     
    // }

    onWithdraw = (values)=>{
        console.log(values);
            let uname=values.wdusername;
          let amt=values.wdamount;
    Bank.withdraw(uname,amt)
         .then(response=>{
            this.setState({balance:response.data.balance})
            swal("success","withdraw successfull","success")
           //this.props.history.push("/home");
            })
             .catch(error=>{
                swal("withdraw failed","U provide invalid data","error")
            });
        }

    render() {
        return (
            <div className="container">
                <h1> Balance:{this.state.balance}</h1>
                <Link to="/history">History</Link>
                <div className="row">
                    <div className="col-6" >
                        {/* <button type="button">Logout</button> */}
                        <div className="jumbotron" >
                            <h3 >DEPOSIT</h3>
                            <Formik
                                initialValues={{
                                    dpusername:"",
                                    dpamount:""
                                }}
                                validationSchema={ DepositSchema }
                                onSubmit={this.onDeposit}
                            >
                                {({ errors,touched })=>(
                           <Form>
                                <div className="form-group">
                                    <label for="">UserName</label>
                                    
                                        <Field name="dpusername"></Field>
                                        {errors.dpusername?<div>{errors.dpusername}</div>:null}
                                        <br />
                                </div>
                                <div className="form-group">
                                    <label for="">Amount</label>
                                   
                                    <Field name="dpamount"></Field>
                                    {errors.dpamount?<div>{errors.dpamount}</div>:null}
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success">
                                        Deposit</button>
                                </div>
                                <h4 id="deposit_id"></h4>
                                </Form>
                                  )}
                                </Formik>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="jumbotron" >
                            <h3 >WITHDRAW</h3>

                            <Formik
                                initialValues={{
                                    wdusername:"",
                                    wdamount:""
                                }}
                                validationSchema={ withdrawalSchema }
                                onSubmit={this.onWithdraw}
                            >
                                {({ errors,touched })=>(
                           <Form>
                                <div className="form-group">
                                    <label for="">UserName</label>
                                   
                                        <Field name="wdusername"></Field> <br />
                                        {errors.wdusername?<div>{errors.wdusername}</div>:null}
                                </div>
                                <div className="form-group">
                                    <label for="">Amount</label>
                                    <Field name="wdamount"></Field>
                               <br />
                               {errors.wdamount?<div>{errors.wdamount}</div>:null}
                                </div>
                                <div className="form-group">
                                    <button type="submit" id="log" className="btn btn-success" >
                                        Withdraw</button>
                                </div>
                                <h4 id="withdraw_id"></h4>
                                </Form>
                                  )}
                                </Formik>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
