import React,{ useState, useEffect  } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import './RegisterScreen.css';
import Header2 from '../components/Header2';
import { Link } from 'react-router-dom';
import { Register,SignIn } from '../actions/userActions';
export default function RegisterScreen(props) {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const redirectLink = useSelector((state) => state.redirectLink);
    const { redirect } = redirectLink;
    const dispatch = useDispatch();
    const submitHandler = (event) => {
        event.preventDefault();
        if(confirmPass === password){
            dispatch(Register(name,email,password))
        } else {
            alert('Password and comfirm pasword don\'t match');
        }
    }

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    },[redirect,userInfo,history])
    return (
        <div className="register-container">
            <Header2 />
            <div className="register-main">
                <div className="register-headertitle">
                    <h1  className="register-text">
                        <span>Register</span>
                    </h1>
                </div>

                <div className="register-info-container">
                    <div className="register-agreement">
                        By registering, I agree to Dumbtree's Terms of Use and Privacy Policy and I consent to receiving marketing communications from Dumbtree.
                    </div>
                        
                    <div className="register-form-container">
                        <form className="register-form" onSubmit = {submitHandler}>
                            <input 
                                onChange={(event) => {setEmail(event.target.value)}}
                                id='input1' type="text" 
                                onFocus={() => {document.getElementById("input1").className += " input-active";}} 
                                name="email" placeholder="Email address" required/>                            
                            <input 
                                onChange={(event) => {setName(event.target.value)}} 
                                id='input2' type="text" onFocus={() => {document.getElementById("input2").className += " input-active";}} 
                                name="name" placeholder="Your name" required/>
                            <input 
                                onChange={(event) => {setPassword(event.target.value)}} 
                                id='input3' type="text" onFocus={() => {document.getElementById("input3").className += " input-active";}} 
                                name="password" placeholder="Password" required/>

                            <input 
                                onChange={(event) => {setConfirmPass(event.target.value)}} 
                                id='input4' 
                                type="text"  
                                onFocus={() => {document.getElementById("input4").className += " input-active";}} name="comform_password" 
                                placeholder="Conform password" required/>

                            <button 
                                type="submit" 
                            > Register</button>
                        </form>
                    </div>

                    <div className="register-signin">Already registered with Dumbtree?
                        <Link to="/signin" >Sign in</Link>
                    </div>

                </div>
            </div>
        </div>

    )

}