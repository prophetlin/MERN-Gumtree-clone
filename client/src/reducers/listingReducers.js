const { 
    HOME_LISTINGS_REQUEST,
    HOME_LISTINGS_SUCCESS,
    HOME_LISTINGS_FAIL,
    LISTING_ID_REQUEST,
    LISTING_ID_FAIL,
    LISTING_ID_SUCCESS,
    CREATE_LISTING_REQUEST,
    CREATE_LISTING_SUCCESS,
    CREATE_LISTING_FAIL,
    UPLOAD_FILE_GET,
    UPLOAD_FILE_REQUEST,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAIL} = require("../constants/listingConstants");



export const homeListingReducer = (state = { listings: [] }, action) => {
    switch(action.type) {
        case HOME_LISTINGS_REQUEST:
            return {loading: true};
        case HOME_LISTINGS_SUCCESS:
            return {loading: false, listings: action.payload};
        case HOME_LISTINGS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export const ListingPageReducer = (state = { listing: [] }, action) => {
    switch(action.type) {
        case LISTING_ID_REQUEST:
            return {loading: true};
        case LISTING_ID_SUCCESS:
            return {loading: false, listing: action.payload, redirect: '/listings/'+action.payload._id};
        case LISTING_ID_FAIL:
            return {loading: false, error: action.payload, redirect: '/listings/'+action.payload._id}
        default:
            return state
    }

}
export const CreateListingReducer = (state = { listing: [] }, action) => {

    switch(action.type) {
        case CREATE_LISTING_REQUEST:
            return {loading: true};
        case CREATE_LISTING_SUCCESS:
            console.log("success")
            return {loading: false, listing: action.payload}
        case CREATE_LISTING_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }

}

export const UploadFileReducer = (state = {status:''}, action) =>{

    switch(action.type){
        case UPLOAD_FILE_GET:
            return {status: 'getUpload'};
        case UPLOAD_FILE_REQUEST:
            return {status: 'uploading'};
        case UPLOAD_FILE_SUCCESS:
            return {status: 'uploaded'};
        case UPLOAD_FILE_FAIL:
            return {status: 'uploadError'};

        default:
            return state;
    }
}