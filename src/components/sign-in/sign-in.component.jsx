import React, { useState } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import './sign-in.style.scss';
import { signInWithGoogle } from '../../firebase/firebase.utils';

const SinIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        setEmail('');
        setPassword('');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    return (
        <div className="sign-in">
            <h2>I already have an acoount</h2>
            <span>Sign with your email and passsword</span>
            <form onSubmit={handleSubmit}>
                <FormInput type="email" onChange={handleChange} name="email" value={email} label="Email" required />

                <FormInput type="password" onChange={handleChange} name="pssword" value={password} label="Password" required />
                <div className="buttons">
                    <CustomButton type="submit" > Sign In </CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn> Sign In with google </CustomButton>
                </div>
            </form>
        </div>
    )
}

export default SinIn;