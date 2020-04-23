import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './sign-in.style.scss';

import firebase from '../../firebase/firebase.utils';

import { validate } from '../../components/validations/form-validation-rules';

import { googleSignInStart } from '../../redux/user/user.actions';

const formFields = {
    email: "",
    password: "",
}

const formErrors = {
    email: "",
    password: ""
}

const SignIn = (props) => {
    const [formField, setFormField] = useState(formFields);
    const [formError, setFormErrors] = useState(formErrors);
    const [userNotExist, setUserNotExist] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        Object.entries(formField).forEach(([key, value]) => {
            let errors = validate({ name: key, value: value }, formError);
            if (value.length === 0) {
                valid = false;
            }
            setFormErrors(() => ({ ...errors }));
        });

        if (valid) {
            try {
                await firebase.auth().signInWithEmailAndPassword(formField.email, formField.password);
            } catch (error) {
                setUserNotExist(error);
                console.log(error);
            }
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormField((values) => ({ ...values, [name]: value }));

        let errors = validate(e.target, formError);
        setFormErrors(() => ({ ...errors }));
    }

    const { googleSignInStart } = props;

    return (
        <div className="sign-in">
            <h2>I already have an acoount</h2>
            {userNotExist ?
                <span className="error">Please enter valid email and password</span> :
                <span>Sign with your email and passsword</span>
            }
            <form onSubmit={handleSubmit}>
                <FormInput type="text" onChange={handleChange} name="email" error={formError.email} value={formField.email} label="Email" />

                <FormInput type="password" onChange={handleChange} name="password" error={formError.password} value={formField.password} label="Password" />

                <div className="buttons">
                    <CustomButton type="submit" > Sign In </CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn> Sign In with google </CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart())
});

export default connect(null, mapDispatchToProps)(SignIn);