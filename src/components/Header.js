import React from 'react';
import './header.css';
import image from './StandardMe_Alpha_small.png';

const Header = () => {
    return (
        <div>
            <img className='logo' src={image} alt="" />
        </div>
    );
};

export default Header;