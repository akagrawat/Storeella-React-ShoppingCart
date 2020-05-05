import { gql } from 'apollo-boost';

import { addItemToCart, getCartItemCount, removeItemFromCart, getCartItemTotal, clearItemFromCart } from './cart.utils';

export const typeDefs = gql`
extend type Item {
    quantity: Int
}

extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!,
    RemoveItemFromCart(item: Item!): [Item]!,
    ClearItemFormCart(item: Item!): [Item]!,
    SetCurrentUser(user: User!): User!
    ClearCart: String
}`;

const GET_CART_HIDDEN = gql`
{
    cartHidden @client
}`;

const GET_CART_ITEMS = gql`
{
    cartItems @client
}`;

const GET_CART_ITEM_COUNT = gql`
{
    itemCount @client
}`;

const GET_CART_ITEM_TOTAL = gql`
{
    itemTotal @client
}`;

const GET_CURRENT_USER = gql`
{
    currentUser @client
}`;

const updateItemCount = (cache, cartItems) =>
    cache.writeQuery({
        query: GET_CART_ITEM_COUNT,
        data: { itemCount: getCartItemCount(cartItems) }
    });

const updateItemTotal = (cache, cartItems) =>
    cache.writeQuery({
        query: GET_CART_ITEM_TOTAL,
        data: { itemTotal: getCartItemTotal(cartItems) }
    });

export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, _args, { cache }) => {
            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN
            });
            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden }
            });
            return !cartHidden;
        },

        addItemToCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = addItemToCart(cartItems, item);

            updateItemCount(cache, newCartItems);

            updateItemTotal(cache, newCartItems);

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            });
            return newCartItems;
        },

        removeItemFromCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = removeItemFromCart(cartItems, item);

            updateItemCount(cache, newCartItems);

            updateItemTotal(cache, newCartItems);

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            });
        },

        clearItemFormCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS,
            });

            const newCartItems = clearItemFromCart(cartItems, item);

            updateItemCount(cache, newCartItems);

            updateItemTotal(cache, newCartItems);

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            });

        },
        setCurrentUser: (_root, { user }, { cache }) => {
            const { currentUser } = cache.readQuery({
                query: GET_CURRENT_USER
            });

            cache.writeQuery({
                query: GET_CURRENT_USER,
                data: { currentUser: user }
            });

            return currentUser;
        },

        clearCart: (_root, _args, { cache }) => {

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: [] }
            });

            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });
            console.log(cartItems);
            updateItemCount(cache, cartItems);
            updateItemTotal(cache, cartItems);
        }

    }
}

