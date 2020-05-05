import React from 'react';

import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import Header from './header.component';
import Spinner from '../spinner/spinner.component';

const GET_CART_HIDDEN = gql`
{
    cartHidden @client
}
`;

const GET_CURRENT_USER = gql`
{
    currentUser @client
}`;

const CLEAR_CART = gql`
mutation ClearCart{
    clearCart @client
}`

const HeaderContainer = () => {
    const { loading: cartHiddenLoading, error: cartHiddenError, data: cart } = useQuery(GET_CART_HIDDEN);
    const { loading: currentUserLoading, error: currentUserError, data: user } = useQuery(GET_CURRENT_USER);
    const [clearCart] = useMutation(CLEAR_CART);

    if (cartHiddenLoading || currentUserLoading) return <Spinner />;
    if (cartHiddenError || currentUserError) return;

    return <Header hidden={cart.cartHidden} currentUser={user.currentUser} clearCart={() => clearCart()} />

};

export default HeaderContainer;
