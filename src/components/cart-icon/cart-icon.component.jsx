import React from 'react';

import { CartIconContainer, ShoppingIconCotainer, ItemCountContainer } from './cart-icon.styles';
const CartIcon = ({ toggleCartHidden, itemCount }) => {
  return (
    <CartIconContainer onClick={toggleCartHidden}>
      <ShoppingIconCotainer />
      <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartIconContainer>
  );
}

export default CartIcon;
