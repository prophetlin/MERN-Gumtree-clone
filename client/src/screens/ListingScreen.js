import React,{ useEffect } from 'react';
import './ListingScreen.css';
import SearchBar from '../components/SearchBar';
import { Listing_Id } from '../actions/listingActions';
import { useSelector, useDispatch } from 'react-redux';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import Header2 from '../components/Header2';
import { useHistory } from "react-router-dom";
export default function ListingScreen(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const listingId = props.match.params.id;
    const ListingPage = useSelector((state) => state.ListingPage);
    const { loading, error, listing } = ListingPage;

    useEffect(() => {
        dispatch(Listing_Id(listingId));
    },[dispatch, listingId]);



    // if(!listing) {
    //     return <div> Item Not Found</div>
    // }

    return (

        <div className="listing-grid">
        <Header2 searchbar={true} />

        {loading ? (<LoadingBox />)                 
            : 
            error ? (<div className="mb-wrap"><MessageBox variant="danger">{error}</MessageBox></div>)
            : (

        <div className='listing-content'>
                <div className='listing-directory'>
            <a>Home</a>
            <i class="fas fa-chevron-right"></i>
            <a> {listing.location}</a>
            <i class="fas fa-chevron-right"></i>
            <a> {listing.category}</a>
            <i class="fas fa-chevron-right"></i>
            <a> Ad ID {listing._id}</a>
            </div>
            <div className='listing-content-info'>

                <div className='listing-content-image-wrapper'>
                    <img className='listing-content-image'src={listing.image && listing.image.substring(1)} alt=""></img>
                </div>
                <div className='listing-content-detail'>
                    <div className='detail-header'>
                        <div className='detail-header-views detail-header-items'>
                            33 views
                        </div>
                        <div className='detail-header-actions'>
                            <div className='detail-header-post detail-header-items'>
                                <i class="far fa-plus-square"></i>
                                <div>
                                    Post Similar Ad
                                </div>
                            </div>
                            <div className='detail-header-report detail-header-items'>
                                <i class="far fa-flag"></i>
                                Report Ad
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='detail-body'> 
                        <div className='detail-body-title'> 
                            {listing.title}
                        </div>
                        <div className='detail-body-price'> 
                            ${listing.price}
                            {listing.negotiable ? (<div className='price-negotiable'>Negotiable</div>) : null }
                        </div>
                        
                        <div className='detail-body-location'>
                            <i className="fas fa-map-marker-alt"></i>
                            <a>{listing.location}</a>
                        </div>

                        <textarea className='detail-body-description'>
                            {listing.detail}                        
                        </textarea>
                        <div className='detail-body-attributes'>
                        <table className='attributes-table'>
                            <tr className='attr-upper'>
                                <td className='attr-title'>DateListed:</td>
                                <td>30/01/2021</td>
                                <td className='attr-title'>last edited:</td>
                                <td>30/01/2021</td>
                            </tr>
                            <tr className='attr-lower'>
                                <td className='attr-title'>Condition:</td>
                                <td>New</td>
                                <td className='attr-title'>Make:</td>
                                <td>Sydney</td>
                        </tr>
                        </table>
                        </div>
                    </div>

                </div>
                

            </div>

            <div className='listing-seller-info'>

            
            </div>

        </div>
        )}
        </div>

    )
}