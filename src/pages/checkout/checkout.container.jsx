import React from 'react';

import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

import CheckoutPage from './checkout.component';
import Spinner from '../../components/spinner/spinner.component';

const GET_CART_ITEMS = gql`
{
    cartItems @client
}`;

const GET_CART_ITEM_TOTAL = gql`
{
    itemTotal @client
}
`;

const CheckoutPageContainer = () => {
    const { loading: itemTotalLoading, error: itemTotalError, data: total } = useQuery(GET_CART_ITEM_TOTAL);
    const { loading: cartItemsLoading, error: cartItemsError, data: items } = useQuery(GET_CART_ITEMS);

    if (itemTotalLoading || cartItemsLoading) return <Spinner />;
    if (cartItemsError || itemTotalError) return;

    return (
        <CheckoutPage cartItems={items.cartItems} total={total.itemTotal} />
    )
};

export default CheckoutPageContainer;