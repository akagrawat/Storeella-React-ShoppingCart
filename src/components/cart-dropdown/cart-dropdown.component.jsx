import React from 'react';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import { CartDropdownContainer, CustomButtonContainer, EmptyMessageContainer, CartItemsContainer } from './cart-dropdown.styles';

const CartDropdown = ({ cartItems, history, toggleCartHidden }) => (
  <CartDropdownContainer>
    <CartItemsContainer>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
          <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
        )}
    </CartItemsContainer>
    <CustomButtonContainer
      onClick={() => {
        history.push('/checkout');
        toggleCartHidden();
      }}
    >
      GO TO CHECKOUT
    </CustomButtonContainer>
  </CartDropdownContainer>
);


export default withRouter(CartDropdown);
