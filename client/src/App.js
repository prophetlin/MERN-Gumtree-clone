import React from 'react'
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import ListingScreen from './screens/ListingScreen';
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import RegisterScreen from './screens/RegisterScreen';
import SigninScreen from './screens/SigninScreen';
import AdspaceScreen from './screens/AdspaceScreen';
import CreateAdScreen from './screens/CreateAdScreen';
require('dotenv').config();

function App() {
    
    return (
        <BrowserRouter>
        <div className="grid-container">

            <Header />

            <main>
                <Route path="/listings/:id" component={ListingScreen} />
                <Route path="/" component={HomeScreen} exact />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/signin" component={SigninScreen} />
                <Route path="/ad" component={AdspaceScreen} />
                <Route path="/create" component={CreateAdScreen} />
            </main>

            <footer>
                All right reserved
            </footer>
    </div>
    </BrowserRouter>                                
    );
}
export default App;