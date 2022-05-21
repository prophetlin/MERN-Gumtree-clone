import Axios from "axios";
import { HOME_LISTINGS_REQUEST,
         HOME_LISTINGS_SUCCESS,
         HOME_LISTINGS_FAIL,
         LISTING_ID_REQUEST,
         LISTING_ID_SUCCESS,
         LISTING_ID_FAIL,
         CREATE_LISTING_REQUEST,
         CREATE_LISTING_SUCCESS,
         CREATE_LISTING_FAIL,
         UPLOAD_FILE_REQUEST,
         UPLOAD_FILE_FAIL,
         UPLOAD_FILE_SUCCESS
                        
        } from "../constants/listingConstants";

import { firebase_app } from '../firebase.js';

export const Listings_all = () => async (dispatch) => {
    dispatch({
        type: HOME_LISTINGS_REQUEST
    });
    try {
        const {data} = await Axios.get('/api/listings');
        dispatch({ type: HOME_LISTINGS_SUCCESS, payload: data})
    } catch(error){
        dispatch({type: HOME_LISTINGS_FAIL, payload: error.message})
    }
}

export const Listing_Id = (id) => async (dispatch) => {

    dispatch({
        type: LISTING_ID_REQUEST
    });
    try {
        const {data} = await Axios.get(`/api/listings/${id}`);
        saveViewHistory(id)
        dispatch({ type: LISTING_ID_SUCCESS, payload: data})
    } catch(error){
        dispatch({type: LISTING_ID_FAIL, 
            payload: (
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
                )})
    }
}
export const createListing = (title,category,image,price,location,detail,negotiable,condition) => async (dispatch) => {
    let dateListed = new Date().toISOString().slice(0, 10);
    dispatch({ type: CREATE_LISTING_REQUEST, payload: {title,category,image,price,location,detail,negotiable,condition,dateListed} });

    try {
        
        const {data} = await Axios.post('/api/listings/create',({title,category,image,price,location,detail,negotiable,condition,dateListed}));
        dispatch({type: CREATE_LISTING_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: CREATE_LISTING_FAIL, payload:(
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message)})
    }

}

//this is to backend currently not used
export const uploadFile = (file) => async (dispatch) => {

    dispatch({ type: UPLOAD_FILE_REQUEST});
    try {
        const formData = new FormData();
        formData.append('file',file)
        const {data} = await Axios.post('/api/listings/upload',formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }})
        dispatch({ type: UPLOAD_FILE_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: UPLOAD_FILE_FAIL, payload:(
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message)})
    }

}
export const uploadFirebase = (file) => async (dispatch) => {

    dispatch({ type: UPLOAD_FILE_REQUEST});
    try {

        const storageRef = firebase_app.storage().ref();
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then(() => {
            console.log("uploaded to firebase", file.name)
        })

        dispatch({ type: UPLOAD_FILE_SUCCESS, payload: {}})
    } catch (error) {
        dispatch({ type: UPLOAD_FILE_FAIL, payload:(
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message)})
    }

}





//save view history onto localstorage
const saveViewHistory = (id) => {
    const viewHistoryList = JSON.parse(localStorage.getItem("viewHistory"));
    if(viewHistoryList){
        if(!viewHistoryList.vh_list.find( (i) => { return i===id}  )){
            viewHistoryList.vh_list.push(id);
            localStorage.setItem("viewHistory",JSON.stringify({'vh_list':viewHistoryList.vh_list}))
        }
    } else{
        localStorage.setItem("viewHistory",JSON.stringify({'vh_list': [id]}))
    }
    
}


