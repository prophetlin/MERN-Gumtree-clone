import React, { useEffect,useState } from 'react'
import Listing from '../components/Listing';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { useSelector, useDispatch } from 'react-redux';
import { Listings_all } from '../actions/listingActions';
import { useHistory,Link } from "react-router-dom";
import SearchBar from '../components/SearchBar';

export default function HomeScreen() {

    const dispatch = useDispatch();
    const history = useHistory();
    const homeListings = useSelector((state) => state.homeListings);
    const { loading, error, listings } = homeListings;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    //activeTab is to change tab button styles 
    const [activeTab, setactiveTab] = useState(1);
    //renderListing is to change the content of tabs
    const [renderListings, SetRenderListings] = useState([]);
 
    useEffect(() => {
        dispatch( Listings_all());
    },[dispatch]);

    useEffect(() => {
        SetRenderListings(listings);
    },[listings]);

    //active the view history tab
    const ActiveRecentViewed = () => {
        setactiveTab(2);
        //get recent viewed listings from storage
        if(JSON.parse(localStorage.getItem("viewHistory"))){
            SetRenderListings(listings.filter( (i) => { return JSON.parse(localStorage.getItem("viewHistory").includes(i._id)) } ))
        } else{
            SetRenderListings([]);
        }
    }

    const ActiveGallery = () => {
        setactiveTab(1);
        SetRenderListings(listings);
    }

    const ActiveWatchlist = () => {
        setactiveTab(3);
        //get watched listings from storage
        if(JSON.parse(localStorage.getItem("watch_List"))){
            SetRenderListings(listings.filter( (i) => { return JSON.parse(localStorage.getItem("watch_List").includes(i._id)) } ))
        } else{
            SetRenderListings([]);
        }
    }
    const refreshPage = ()=>{
        window.location.reload();
     }
    
    return (
        <>
        <div className='main-panel'>
            <img onClick={refreshPage} className="main-bg mouse-pointer" src="./images/ddt.jpg" alt=""></img>
            <img onClick={refreshPage} className="main-logo mouse-pointer" src="./images/gt.png" alt=""></img>

            <Link to={userInfo ? './create' : './signin'} className='main-postad'>               
                <div >
                    <i class="fas fa-circle fa-xs"></i>
                    <span>     Post an Ad</span>                 
                </div>
            </Link>
            
            <SearchBar background={true}/>
        </div>
        
        <div className='main-items'>
            <div className='item-tabs'>
                <ul>
                    <li>
                        <div 
                            className={activeTab === 1 ? 'tab-active' : null} 
                            onClick={ ActiveGallery }>
                            HomePage Gallery
                        </div>
                    </li>
                </ul>
                <ul>
                    <li>
                        <div 
                            className={activeTab === 2 ? 'tab-active' : null}
                            onClick={ ActiveRecentViewed }>
                            Recently Viewed
                        </div>
                    </li>
                </ul>
                <ul>
                    <li>
                        <div 
                        className={activeTab === 3 ? 'tab-active' : null}
                            onClick={ ActiveWatchlist  }>
                            Watchlist
                        </div>
                    </li>
                </ul>

            </div>
            {loading ? (<LoadingBox />)                 
                : 
                error ? (<MessageBox variant="danger">{error}</MessageBox>)
                : 
                renderListings ?
                (<div className='main_content-container'>

                        <div className='main-content'>

                            {renderListings.map(
                                (listing) => (
                                    <Listing key={listing._id} listing = {listing }></Listing>
                                )
                            )}

                        </div>
                    </div>
                )
                : null
                
            }


        </div>

    </>
    )}