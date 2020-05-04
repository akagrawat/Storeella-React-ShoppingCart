import React from 'react';

import { useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CheckoutItem from './checkout-item.component';

const ADD_ITEM_TO_CART = gql`
mutation AddItemToCart($item: Item!){
    addItemToCart(item: $item) @client
}`;

const REMOVE_ITEM_FROM_CART = gql`
mutation RemoveItemFromCart($item: Item!){
    removeItemFromCart(item: $item) @client
}`;

const CLEAR_ITEM_FROM_CART = gql`
mutation ClearItemFormCart($item: Item!){
    clearItemFormCart(item: $item) @client
}`

const CheckoutItemContainer = (props) => {
    const [addItem] = useMutation(ADD_ITEM_TO_CART);
    const [removeItem] = useMutation(REMOVE_ITEM_FROM_CART);
    const [clearItem] = useMutation(CLEAR_ITEM_FROM_CART);

    return <CheckoutItem {...props} addItem={(item) => addItem({ variables: { item } })}
        removeItem={item => removeItem({ variables: { item } })}
        clearItem={item => clearItem({ variables: { item } })} />
}

export default CheckoutItemContainer;