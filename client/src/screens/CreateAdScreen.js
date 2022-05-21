import React,{ useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Header2 from '../components/Header2';
import ImageUploader from 'react-images-upload';
import './CreateAdScreen.css';
import { getLocation } from '../utils/GetLocation';
import { uploadFile,createListing } from '../actions/listingActions';
import { useHistory } from 'react-router-dom';

//dispatch(uploadFile(Files[0]))
export default function CreateAdScreen(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const [price,setPrice] = useState(0);
    const [nego,setNego] = useState(false);
    const [image,setImage] =useState();
    const [title,setTitle] = useState('');
    const [category,setCategory] = useState('Miscellaneous');
    const [condition,setCondition] = useState('Used');
    const [description,setDescription] = useState('');
    const [location,setLocation] = useState('');

    //checks for parameters and then dispatch action to upload photo and ad
    const handleSubmit = () =>{

        if(title === ''){
            alert('Please Enter Ad title');
            return
        }
        if(description === ''){
            alert('Please Enter Ad description');
            return
        }
        if(image === undefined){
            alert('Please upload cover image');
            return
        }
        if(location === ''){
            alert('Ad location is not specified');
            return
        }
        
        dispatch(uploadFile(image));

        dispatch(createListing(
            title,
            category,
            './images/'+image.name,
            price,
            location,
            description,
            nego,
            condition,               
        ))
        history.push('/');

    }


    
    //this runs once to get the user's location
    useEffect( ()=>{
        getLocation(setLocation);
    },[]);

    // useEffect(() => {
    //     if(listing !== undefined){
    //         console.log(listing.id)
    //         history.push("/listings/"+listing.id)

    //     }
    // },[listing])


    return (
        <div className="createad-container">
            <Header2 />
            <div className="createad-headertitle">
                <h1  className="createad-text">
                    <span>Post An Ad</span>
                </h1>
            </div>
            <div className="createad-main">

                <div className="createad-attri-contain">
                    <div className = "createad-title">Title</div>
                    <input
                        onChange = {(e) => {setTitle(e.target.value)}} 
                        className = "createad-title-input"></input>
                    <div className = "createad-tip">
                        <div className = "createad-tip-content">
                            <span><i class="fas fa-pencil-alt fa-2x"></i></span>
                            <div>
                                Give your ad a descriptive title to improve its visibility.
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className = "createad-attri-contain">
                    <div className = "createad-title">Category</div>
                    <div className = "creatad-dropdown">
                        <select onChange = { (e) => setCategory(e.target.value) }>
                            <option value="Miscellaneous">Miscellaneous</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Vehicles">Vehicles</option>
                        </select>
                    
                    </div>
                
                </div>
                <hr className = "createad-hr"></hr>
                <div className = "createad-attri-contain">
                    <div className = "createad-title">Price</div>

                        <div className="createad-title-price">
                            <span 
                                class="createad-title-pricespan">
                                    $
                                <input
                                    type="text"
                                    value={price}
                                    onChange={(e)=>setPrice(e.target.value)}>                               
                                </input>                    
                            </span>
                    </div>

                    <label class="createad-check-container">
                        <input check = {nego} onChange={()=>setNego(!nego)}type="checkbox"></input>
                        <span class="checkmark"></span>
                        Negotiable
                    </label>
                </div>

                <div className = "createad-attri-contain">
                    <div className = "createad-title">Condition</div>
                    <div className = "creatad-dropdown createad-condition">
                        <select onChange={(e)=>{setCondition(e.target.value)}}>
                            <option value="Used">Used</option>
                            <option value="New">New</option>
                            <option value="Faulty">Faulty</option>
                        </select>
                    
                    </div>
            
                </div>
                    <div className = "createad-tip2">
                        <div className = "createad-tip-content">
                            <span><i class="fas fa-pencil-alt fa-2x"></i></span>
                            <div>
                            Did you know it's FREE to edit your listing for the full duration of your ad?
                            </div>
                        </div>
                        
                    </div>

                <div className = "createad-attri-contain">
                <div className = "createad-title">Description</div>
                    <textarea
                        onChange={(e)=>setDescription(e.target.value)} 
                        className="createad-textarea"/>
                </div>
                <hr className = "createad-hr"></hr>

                <div className = "createad-attri-contain">
                    <div className = "createad-title">Cover Picture</div>
                    <ImageUploader
                        imgExtension={['.jpg', '.png']}
                        label="Maximum file size: 5MB , accepted format: jpg|png"
                        maxFileSize={5242880}
                        withPreview={true}
                        singleImage={true}
                        onChange={(Files) => setImage(Files[0])}

                    />
            
                </div>

                <button 
                    onClick = {handleSubmit}
                    className="createad-postbutton">Post Ad
                </button>

            </div>
        
        
        </div>


    )
}