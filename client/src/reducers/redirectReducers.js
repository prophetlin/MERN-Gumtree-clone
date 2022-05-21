const { 
    LISTING_ID_FAIL,
    LISTING_ID_SUCCESS,
    HOME_LISTINGS_REQUEST,} = require("../constants/listingConstants");


export const redirectLinkReducer = (state = {redirect:'/'}, action) => {
    switch(action.type) {
        case LISTING_ID_SUCCESS:
            return {redirect: '/listings/'+action.payload._id};
        case LISTING_ID_FAIL:
            return {redirect: '/listings/'+action.payload._id};
        case HOME_LISTINGS_REQUEST:
            return {redirect:'/'}
        default: return state
    }
}