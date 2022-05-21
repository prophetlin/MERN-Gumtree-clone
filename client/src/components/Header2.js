import React from 'react';
import { useHistory } from "react-router-dom";
import SearchBar from './SearchBar';
export default function Header2(props) {
    const history = useHistory();
    return (

        <div className="listing-header">
            <div className="listing-header-upper">
                <div className="listing-header-upper-wrapper">
                    <img onClick={()=>{history.push("/")}} className="listing-logo mouse-pointer" src="/images/gt.png" alt=""></img>
                </div>
                
            </div>
            { props.searchbar 
            ? <div className="listing-searchbar-wrapper"> <SearchBar /> </div>
            : null
            }
        </div>


    )

}