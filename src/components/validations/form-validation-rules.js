const emailRegex = RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);

export const validate = (formField, formErrors) => {
    const { name, value } = formField;
    let error = formErrors;
    switch (name) {
        case 'email':
            error.email = (value.length === 0) ? 'Email is required' : ((emailRegex.test(value)) ? "" : "Enter valid email");
            break;
        case 'password':
            error.password = (value.length === 0) ? 'Password is required' : '';
            break;
        case 'displayName':
            error.displayName = (value.length === 0) ? 'Display Name is required' : '';
            break;
        case 'confirmPassword':
            error.confirmPassword = (value.length === 0) ? 'Confirm Password is required' : '';
            break;
        default:
            break;
    }
    return error;
}
