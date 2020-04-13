import React from 'react';
import './custom-button.style.scss';

const CustomButton = ({ children, inverted, isGoogleSignIn, ...otherProps }) => {

    return (
        <button className={`${inverted ? 'inverted' : ''} custom-button`} {...otherProps}>
            {children}
        </button>
    )
}

export default CustomButton;