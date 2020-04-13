import React from 'react';
import './form-input.style.scss';

const FormInput = ({ handleChange, error, label, ...otherProps }) => {
    return (
        <div className="group">
            <input className="form-input" onChange={handleChange} {...otherProps} />
            {
                label ?
                    (<label className={`${otherProps.value.lenght ? 'shrink' : ''} form-input-label`}>{label}</label>) : null
            }
            {
                error ?
                    <span className="form-error">{error}</span> : null
            }
        </div>
    )
}

export default FormInput;
