import React, { useState } from 'react';
import './sign-up.style.scss';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

const SignUp = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'displayName':
                setDisplayName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                break;
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Paswords don't match");
            return;
        }

        try {

            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });
            setDisplayName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="sign-up">
            <h2 className="title">I dont have an account</h2>
            <span>Sign Up with your Email and Pasword</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput onChange={handleChange} type="text" name="displayName" value={displayName} label="Display Name" required />
                <FormInput onChange={handleChange} type="email" name="email" value={email} label="Email" required />
                <FormInput onChange={handleChange} type="password" name="password" value={password} label="Password" required />
                <FormInput onChange={handleChange} type="password" name="confirmPassword" value={confirmPassword} label="confirmPassword" required />
                <CustomButton >Sign up</CustomButton>
            </form>
        </div>
    )
}

export default SignUp;;