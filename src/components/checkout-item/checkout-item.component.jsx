import React from 'react';


import {
  CheckoutItemContainer, ImageContainer, SpanContainer,
  QuantityContainer, ArrowContainer, ValueContainer, RemoveButtonContainer
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt='item' />
      </ImageContainer>
      <SpanContainer>{name}</SpanContainer>
      <QuantityContainer>
        <ArrowContainer onClick={() => removeItem(cartItem)}>
          &#10094;
        </ArrowContainer>
        <ValueContainer>{quantity}</ValueContainer>
        <ArrowContainer onClick={() => addItem(cartItem)}>
          &#10095;
        </ArrowContainer>
      </QuantityContainer>
      <SpanContainer>{price}</SpanContainer>
      <RemoveButtonContainer onClick={() => clearItem(cartItem)}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};


export default CheckoutItem;
