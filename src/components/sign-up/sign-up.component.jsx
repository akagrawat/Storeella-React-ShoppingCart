import React, { useState } from 'react';
import { connect } from 'react-redux';

import './sign-up.style.scss';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { validate } from '../../components/validations/form-validation-rules';

import { signUpStart } from '../../redux/user/user.actions';



const initalFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const initalFormErrors = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}


const SignUp = ({ signUpStart }) => {
    const [formField, setFormField] = useState(initalFormFields);
    const [formError, setFormErrors] = useState(initalFormErrors);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormField((values) => ({ ...values, [name]: value }));

        let errors = validate(event.target, formError);
        setFormErrors(() => ({ ...errors }));

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formField.password !== formField.confirmPassword) {
            alert("Paswords don't match");
            return;
        }

        let valid = true;
        Object.entries(formField).forEach(([key, value]) => {
            let errors = validate({ name: key, value: value }, formError);
            if (value.length === 0) {
                valid = false;
            }
            setFormErrors(() => ({ ...errors }));
        });

        if (valid) {
            console.log('formSubmit successfulklty');
            const { email, password, displayName } = formField;
            signUpStart(email, password, displayName);
            setFormField(initalFormFields);
            setFormErrors(initalFormErrors);

            // try {
            //     const { user } = await auth.createUserWithEmailAndPassword(formField.email, formField.password);
            //     await createUserProfileDocument(user, formField.displayName);
            //     setFormField(initalFormFields);
            //     setFormErrors(initalFormErrors);
            // } catch (error) {
            //     console.error(error);
            // }
        }
    }

    return (
        <div className="sign-up">
            <h2 className="title">I dont have an account</h2>
            <span>Sign Up with your Email and Pasword</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput onChange={handleChange} type="text" name="displayName" error={formError.displayName} value={formField.displayName} label="Display Name" />
                <FormInput onChange={handleChange} type="email" name="email" error={formError.email} value={formField.email} label="Email" />
                <FormInput onChange={handleChange} type="password" name="password" error={formError.password} value={formField.password} label="Password" />
                <FormInput onChange={handleChange} type="confirmPassword" name="confirmPassword" error={formError.confirmPassword} value={formField.confirmPassword} label="confirmPassword" />
                <CustomButton >Sign up</CustomButton>
            </form>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
    signUpStart: (email, password, displayName) => dispatch(signUpStart({ email, password, displayName }))
});

export default connect(null, mapDispatchToProps)(SignUp);;