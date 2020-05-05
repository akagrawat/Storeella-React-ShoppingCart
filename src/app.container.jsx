import React from 'react';

import { useMutation, useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

import App from './App';
import Spinner from './components/spinner/spinner.component';

const SET_CURRENT_USER = gql`
mutation SetCurrentUser($user: User!) {
  setCurrentUser(user: $user) @client
}
`;

const GET_CURRENT_USER = gql`
{
  currentUser @client
}
`;

const AppContainer = () => {
    const [setCurrentUser] = useMutation(SET_CURRENT_USER);
    const { loading, error, data } = useQuery(GET_CURRENT_USER);

    if (loading) return <Spinner />;
    if (error) return;
    return <App setCurrentUser={user => setCurrentUser({ variables: { user } })}
        currentUser={data.currentUser} />
};

export default AppContainer;