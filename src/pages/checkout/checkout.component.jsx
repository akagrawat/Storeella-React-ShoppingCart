import React from 'react';

import { default as CheckoutItem } from '../../components/checkout-item/checkout-item.container';

import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import {
  CheckoutPageContainer, CheckoutHeaderContainer, HeaderBlock,
  TotalText, TestWarningText,
} from './checkout.styles';

const CheckoutPage = ({ cartItems, total }) => (
  <CheckoutPageContainer>
    <CheckoutHeaderContainer>
      <HeaderBlock>
        <span>Product</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Description</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Quantity</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Price</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Remove</span>
      </HeaderBlock>
    </CheckoutHeaderContainer>
    {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <TotalText>TOTAL: ${total}</TotalText>
    <TestWarningText>
      *Please use the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
    </TestWarningText>
    <StripeCheckoutButton price={total} />
  </CheckoutPageContainer>
);

export default CheckoutPage;
