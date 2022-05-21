import React, { useState } from 'react'
import reactDom from 'react-dom';
import { Link } from 'react-router-dom';
export default function Listing(props) {

    const { listing } = props;

    const initState = () => {
        if(JSON.parse(localStorage.getItem("watch_List"))){
            if(JSON.parse(localStorage.getItem("watch_List")).watch_List.find((i)=>{return i===listing._id})){
                return true
            }
        }
        return false
    }

    const [isWatch, setWatch] = useState( initState() );




    //if not watched then watch(add to local storage) else if watched then unwatch(remove from storage)
    const triggerWatch = () => {

        if(isWatch) {

            setWatch(false)

            const watchList = JSON.parse(localStorage.getItem("watch_List"));
            //remove listing id from storage
            if(watchList){

                for( var i = 0; i < watchList.watch_List.length; i++){ 
        
                    if ( watchList.watch_List[i] === listing._id) { 
                        watchList.watch_List.splice(i, 1); 
                    }
                }

                if(watchList.watch_List.length === 0){
                    localStorage.removeItem("watch_List");
                }else{
                    localStorage.setItem("watch_List",JSON.stringify({'watch_List':watchList.watch_List}))
                }
            }

        }else {
            setWatch(true)
            
            //add listing id  to local storage
            const watchList = JSON.parse(localStorage.getItem("watch_List"));
            if(watchList ){

                if(!watchList.watch_List.find( (i) => { return i===listing._id}  )){
                    watchList.watch_List.push(listing._id);
                    localStorage.setItem("watch_List",JSON.stringify({'watch_List':watchList.watch_List}))
                }
            } else{
                localStorage.setItem("watch_List",JSON.stringify({'watch_List': [listing._id]}))
            }

        }

    }



    return (
        <div className='content-items'>
        <div key={listing._id} className='item-card'>
        <div className='card-thumb'>
            <Link to={`/listings/${listing._id}`} className='thumb-link'>
                <img className='thumb' src={listing.image} alt={listing.title}></img>
            </Link>

        </div>
        <div className='card-detail'>

            <h3 className='detail-title'>
                <a href={`/listing/${listing._id}`} >
                    {listing.title}
                </a>
            </h3>

            <div className='detail-price'>
                <span className='price-value'>
                    
                    <span className='price-currency'>$</span>
                    
                    {listing.price}
                </span>
            </div>

            <div className='detail-location'>
                {listing.location}
            </div>
            
            <div className='detail-addWatchlist'>
                <i onClick ={triggerWatch} className={isWatch ? "fas fa-heart fa-lg watched" : "far fa-heart fa-lg"}></i>
            </div>
        </div>
        </div>
    </div>
    )
}