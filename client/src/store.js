import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from 'redux';
import thunk from 'redux-thunk';
import {
    CreateListingReducer,
    homeListingReducer,
    ListingPageReducer,
    UploadFileReducer,
} from './reducers/listingReducers';
import { redirectLinkReducer } from './reducers/redirectReducers';
import {
    userSigninReducer
} from './reducers/userReducers';
const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
    

};
const reducer = combineReducers({
    homeListings: homeListingReducer,
    ListingPage: ListingPageReducer,
    userSignin: userSigninReducer,
    createListing: CreateListingReducer,
    UploadFile: UploadFileReducer,
    redirectLink: redirectLinkReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk)));
export default store;