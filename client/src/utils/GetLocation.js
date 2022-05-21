const apikey = '2865959f75b7484aab4478400e7239d4';

var geo = [];
const pushPosition = (positions) => {
    let lat = positions.coords.latitude;
    let long = positions.coords.longitude;
    geo.push(lat)
    geo.push(long)
    
}
const setAddress = (address) => {
    const suburb = address.results[0].components.suburb ? address.results[0].components.suburb : ''
    const postcode = address.results[0].components.postcode ? address.results[0].components.postcode : '';
    const state = address.results[0].components.state_code ? address.results[0].components.state_code : '';
    
    return [suburb,postcode,state];
}
const posError = () => {
    if(window.navigator.permissions){
        window.navigator.permissions.query( { name: 'geolocation' }).then(res =>{
            if(res.state ==='denied'){
                alert('Enable location permission in browser setting to use location')
            }
        })
    } else {
        alert('Unable to access your location')
    }
}
const getAddress = (lat,long,func) => {      
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${apikey}`)
        .then(res => res.json())
        .then(address => setAddress(address))
        .then(res => func(addressStringify(res)))
        // .then(addresslist => updateLocation(addresslist) )

}
const getPosition = () => {
    if(window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(pushPosition, posError);
    }
}
const addressStringify = (location) =>{
    return location[0]+","+location[1]+","+location[2]
}
//takes a function as a callback
export const getLocation = (func) =>{
    getPosition()
    setTimeout(()=>{
        getAddress(geo[0],geo[1],func);
    },10);
    
}

