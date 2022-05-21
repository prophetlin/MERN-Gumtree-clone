import React,{ useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import './header.css';
import { Link } from 'react-router-dom';
import { SignOut } from '../actions/userActions';
export default function Header(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const covidlink= 'https://blog.gumtree.com.au/important-covid-19-update/';
    const [isDropdown,setDropdown] = useState(false);
    const userSignin = useSelector((state) => state.userSignin);

    const { userInfo } = userSignin;
    // const redirectLink = useSelector((state) => state.redirectLink);
    // const { redirect } = redirectLink;
    const signoutHandle = () => {
        dispatch(SignOut());
    }
    // const [redirect_link,setRedirect] = useState('/');

    // useEffect(() => {
    //     setRedirect(redirect)
    // },[redirect])
    const handleDropDown = () => {
        setDropdown(!isDropdown);
    }
    return (


        <header>
        <div className="header-alert">
            <i className="fas fa-exclamation-circle">   keeping our community safe</i>
            <a href={covidlink}>COVID-19 Safety Precautions</a>
        </div>

        <div className="header-nav">
            <div>
                <div onClick={() => {history.push("/")}} className="fas fa-home mouse-pointer"></div>
            </div>
            {userInfo 
                ? (
                    <div className="header-auth">
                    
                        <div onClick={handleDropDown} id='mydumbtree'>
                            <i class="fas fa-user-circle fa-lg"></i>
                            {userInfo.name}
                            
                            <div className={isDropdown ? "header-user-dropdown show" : "header-user-dropdown"}>
                                <div className="header-user-name">  
                                    {userInfo.name}
                                </div>
                                <div className="header-user-item">
                                    <i class="far fa-image fa-2x"></i>
                                    <div>My Ads</div>
                                    
                                </div>
                                <hr></hr>
                                <div onClick={ signoutHandle } className="header-user-item">
                                    <i class="fas fa-sign-out-alt fa-2x"></i>
                                    <div>Sign Out</div>
                                </div>
                            </div>


                        </div>

                    </div>
                    
                )
                : (
                    <div className="header-auth">
                        <Link to='/signin' >Sign in</Link>
                        <Link to='/register' >Register</Link>
                    </div>

            )}

        </div>


    </header>



    )



}