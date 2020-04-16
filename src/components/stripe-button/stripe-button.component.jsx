import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import './stripe-button.style.scss'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price;
    const publishableKey = 'pk_test_dvAIpaFROkEWqp3DJhOd5qWA00OmVFhu20';
    const onToken = (token) => {
        console.log(token);
        alert('Payment Successfully')
    }
    return (
        <StripeCheckout
            label="Pay Now"
            name="Storeella Clothing Pvt Ltd"
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total ₹ ${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;