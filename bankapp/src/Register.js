import React from 'react';
import swal from 'sweetalert';
import Bank from './Bank';
import { withRouter } from 'react-router';
import { Formik, Form, Field } from 'formik';
import * as Yup  from 'yup';
const RegisterSchema = Yup.object().shape({
    username:Yup.string()
    .min(2,'Too short')
    .max(20,'Too long')
    .required('Required'),
    password:Yup.string()
    .min(2,'Too short')
    .max(20,'Too long')
    .required('Required'),
    acno:Yup.string()
    .min(2,'Too short')
    .max(20,'Too long')
    .required('Required'),
    confirmpassword:Yup.string()
    .min(2,'Too short')
    .max(20,'Too long')
    .required('Required')
    
});
class Register extends React.Component{
   
    
    onSubmit =(values)=>{
       
       // event.preventDefault();
       let usname=values.username;
       let pwd=values.password;
       let cpass=values.confirmpassword;
       let acno=values.acno;

       Bank.registration(usname,pwd,cpass,acno)
       .then(response=>{
      
         swal("Registration successful","success","success");
              this.props.history.push("/");
       })
       .catch(err=>{
           swal("Registration failed","failed","error")
       });


    }

    render(){
        return(
            <div className="container">
                <Formik
                    initialValues={{
                        username:"",
                        password:"",
                        acno:"",
                        confirmpassword:""
                    }}
                    validationSchema={ RegisterSchema }
                    onSubmit = { this.onSubmit } >
                        {({errors,touched})=>(
                            <Form>
                                <div className="form-group">
                                    <label for="">UserName</label>
                                   <Field name="username" /><br />
                                   {errors.username?<div>{errors.username}</div>:null}
                                </div>
                                <div className="form-group">
                                    <label for="">Account Number</label>
                                    <Field name="acno" /><br />
                                    {errors.acno?<div>{errors.acno}</div>:null}
                                </div>
                                <div className="form-group">
                                    <label for="">Password</label>
                                    <Field name="password" type="password" /><br />
                                    {errors.password?<div>{errors.password}</div>:null}
                                </div>
                                <div className="form-group">
                                    <label for="" >Confirm Password</label>
                                    <Field name="confirmpassword" type="password"  /><br /><br />
                                    {errors.confirmpassword?<div>{errors.confirmpassword}</div>:null}
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success"> Register</button>
                                </div>
                            </Form>
                        )}
              
                                
                                </Formik>

            </div>
        )
    }
}

export default withRouter(Register);