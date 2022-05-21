import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLocation } from '../utils/GetLocation';
export default function SearchBar(props) {

    const [isDropdown, setDropdown] = useState(false);
    const [category, setCategory] = useState("All categories");
    const [icon, setIcon] = useState("fas fa-bars");
    //this is api autofilled location it autofills at first render
    var defaultLocation = '';
    var firsttime = true;
    //this is user query input
    const [userInput,setInput] = useState(null);
    //this is user's input in the location field
    const [userLocationInput, setUserLocationInput] = useState(null);

    const handleDropDown = () => {
        setDropdown(!isDropdown);
    }

    const handleChangeCategory = (category, icon) => {
        setCategory(category);
        setIcon(icon);
    }

    const updateLocation = (location) => {
        defaultLocation=location;
        setUserLocationInput(location);
        
    }
    //this runs once to get the user's location
    useEffect( ()=>{
        getLocation(updateLocation);
    },[]);

    const createQuery = () =>{
        if(userInput){
            return "/ad?category="+category+"&location="+userLocationInput+"&input="+userInput;
        }
        return "/ad?category="+category+"&location="+userLocationInput;
    }

    const isfirsttime = () => {
        if(firsttime){
            firsttime = false;
            return true;        
        }
        return false;
    }
    return (
        <div className='search-bar-wrapper'>
        <div className={props.background ? 'search-form-wrapper' : 'search-form-wrapper noBackground'}> 

            <form className='search-form' action="">

                <ul className='search-bar-list'>
                    <li onClick= { handleDropDown } className={isDropdown ? 'search-bar-dropdown  green' : 'search-bar-dropdown  deactivatedDropDown'}>

                        <div className='sbdb-wrapper'>
                            <i className={icon +" sbdc-icon"}></i>
                            <span className = {isDropdown ? 'whiteFont': 'blackFont'}>{category}</span>
  
                            <i className="sbd-icon fas fa-chevron-down"></i>

                            <div className={isDropdown ? 'search-bar-dropdown-content show' : 'search-bar-dropdown-content'}>
                                <div 
                                    onClick = { () => {handleChangeCategory("All categories","fas fa-bars" )} } 
                                    id="sbdc-head" value="All categories">
                                    <i className="fas fa-bars sbdc-icon"></i>
                                    All categories
                                </div>
                                <div 
                                    onClick = { () =>{handleChangeCategory("Electronics","fas fa-laptop" )} } 
                                    value="Electronics">
                                    <i className="fas fa-laptop sbdc-icon"></i>
                                    Electronics
                                </div>
                                <div 
                                    onClick = { () => {handleChangeCategory("Vehicles","fas fa-car" )} }
                                    value="Vehicles">
                                    <i className="fas fa-car sbdc-icon"></i>
                                    Vehicles
                                </div>
                                <div 
                                    onClick = { () => {handleChangeCategory("Miscellaneous","fas fa-shopping-cart" )} } 
                                    value="Miscellaneous">
                                    <i className="fas fa-shopping-cart sbdc-icon"></i>
                                    Miscellaneous
                                </div>
                            </div>

                        </div>
                    </li>

                    <li className='search-bar-keyword'>
                        <div className='search-bar-wrapper'>

                            <input 
                                onChange={(event) => {setInput(event.target.value)}}
                                placeholder="I'm looking for..." 
                                className='search-input' 
                                type="text">
                            </input> 

                        </div>
                    </li>
                    <li className='search-bar-location'>
                        <div className='sbl-wrapper'>
                            <i className="fas fa-map-marker-alt"></i>
                            <input
                                value={
                                    userLocationInput 
                                    ? userLocationInput
                                    : isfirsttime() 
                                    ? defaultLocation
                                    : null
                                
                                }
                                onChange={(event) => {setUserLocationInput(event.target.value)}}>                                
                           </input>

                        </div>
                    </li>
                    <li className='search-bar-distance'>
                        <div className='sbd-wrapper'>
                            +0km
                            <i className="sbd-icon fas fa-chevron-down"></i>
                        </div>
                        
                    </li>
                    <li className='search-bar-button'>
                        <div className='sbb-wrapper'>
        
                            <Link to={createQuery} >
                                <i className="fas fa-search fa-2x"></i>
                            </Link>
                            
                        </div>
                                                      
                    </li>
                </ul>

            </form>
        </div>
    </div>
    )
}