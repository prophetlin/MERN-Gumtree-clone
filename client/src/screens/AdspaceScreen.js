import React,{ useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Header2 from '../components/Header2';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { Listings_all } from '../actions/listingActions';
import Adcard from '../components/Adcard';
import './Adspace.css';
export default function AdspaceScreen(props) {
    const dispatch = useDispatch();
    const homeListings = useSelector((state) => state.homeListings);
    const { loading, error, listings } = homeListings;
    const[min,setMin] = useState(0);
    const[max,setMax] = useState(Math.pow(10, 1000));
    const[priceType,setPriceType] = useState();
    const params = new URLSearchParams(window.location.search)

    useEffect(() => {
        dispatch( Listings_all());
    },[dispatch]);


    //searching item is done in the front-end for now
    const filterCategory = (list) => {
        const category=params.get('category')
        if(category === null){
            return list;
        }
        if(category !== "All categories"){
            return list.filter( i => { return i.category === category })
        }
        return list;
    }

    const filterLocation = (list) => {

        const location =params.get('location')
        if(location === null){

            return list;
        }
        var newlist = [];
        if(location !== null){
            //currently only search suburb
            const suburb = location.split(',')[0]
                
                for(var j=0; j<list.length; j++){

                    if(list[j].location.includes(suburb)){
                        newlist.push(list[j])
                    }
                }

        }
        return newlist;  
    }
    const filterKeyword = (list) => {
        
        const input =params.get('input');
        if(input === null) {

            return list;
        }
        var newlist = [];
        for(var i=0; i<list.length; i++){
            console.log(list[i].title)
            console.log(input)
            if(list[i].title.includes(input)){

                newlist.push(list[i]);
            }
        }
        return newlist;
    }

    const filterPricing = (list) => {
        return list.filter( (i) => {return (parseInt(i.price) >=min && parseInt(i.price) <= max) })        
    }
    const filterPriceType = (list) => {

        if(priceType ==='Fixed Price'){
            return list.filter( (i) => {return i.negotiable === false})
        }
        if(priceType ==='Negotiable'){
            return list.filter( (i) => {return i.negotiable === true})
        }
        return list
    }
    const applySearchFilter = (list) => {
        return filterPriceType(filterPricing(filterKeyword(filterLocation(filterCategory(list)))))
    }
    return(
        <>
        <Header2 searchbar={true}/>
        <div className="adspace-container">

            <div className="adspace-filter">
                <div className="adspace-filter-title">
                    Filter & Refine
                </div>
                <hr></hr>
                <div className="adspace-filter-price">
                    <div>Price</div>
                </div>
                <div className="adspace-filter-pricerange">
                    <div className="adspace-filter-pricerange-min">
                        <span 
                            class="adspace-filter-pricerangespan">
                                $
                            <input
                                type="text"
                                placeholder="min"
                                value={min}
                                onChange={(e)=>setMin(e.target.value)}>                               
                            </input>                    
                        </span>
                    </div>
                    <div className="adspace-filter-pricerange-max">
                        <span 
                            class="adspace-filter-pricerangespan">
                                $
                            <input 
                                type="text"
                                placeholder="max"
                                value={max}
                                onChange={(e)=>setMax(e.target.value)}>
                            </input>                    
                        </span>
                    </div>
                </div>
                <hr></hr>
                <div className="adspace-filter-pricetype">
                    <div>Price Type</div>
                </div>
                <div 
                    onClick={()=>setPriceType('Fixed Price')}
                    className="adspace-filter-pricetypeButton">
                    Fixed Price
                </div>
                <div 
                    onClick={()=>setPriceType('Negotiable')}
                    className="adspace-filter-pricetypeButton">
                    Negotiable
                </div>
                <hr></hr>
            </div>
            <div className="adspace-content">
                {loading ? (<LoadingBox />)                 
                    : 
                    error ? (<MessageBox variant="danger">{error}</MessageBox>)
                    :
                    listings ? (
                        <>
                            {applySearchFilter(listings).map(listing =>(                    
                                <Adcard 
                                    key= {listing._id}
                                    image={listing.image} 
                                    title={listing.title}
                                    detail={listing.detail}
                                    price={listing.price}
                                    location={listing.location}
                                    negotiable={listing.negotiable}
                                    dateListed={listing.dateListed}
                                />
                        ))}
                        
                        
                        </>)
                    : null                
                }
            </div>        
        </div>
        </>
    )


}


