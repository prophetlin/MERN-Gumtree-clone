import React from 'react';

export default function Adcard(props) {
    return(

        <div className="adspace-cards">
            <a className="adspace-card">
                <div className="adspace-img-wrap1">
                    <div className="adspace-img-wrap2">
                        <img src={props.image} alt='rb15'></img>
                    </div>
                </div>
                <div className='adspace-card-left'>
                    <div className="adspace-card-left-title">
                        {props.title}
                    </div>
                    <textarea className="adspace-card-left-desc">
                        {props.detail}
                    </textarea>
                </div>

                <div className='adspace-card-right'>
                    <div className="adspace-card-right-top">
                        <div className="adspace-card-right-price">
                            {'$'+props.price}
                        </div>
                        <div className="adspace-card-right-nego">
                            {props.negotiable ? 'Negotiable': null}
                        </div>
                    </div>
                    <div className="adspace-card-right-location">                       
                        {props.location}
                    </div>
                    <div className="adspace-card-right-date">                      
                        {props.dateListed}
                    </div>
                    <div className="adspace-card-right-watch">
                        <i className="far fa-heart fa-lg"></i>
                    </div>
                </div>
            </a>                    
        </div>
    );

}