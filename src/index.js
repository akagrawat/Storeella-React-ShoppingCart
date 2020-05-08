import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';

import { store, persistor } from './redux/store';

import { resolvers, typeDefs } from './graphql/resolvers';

import './index.css';
import { default as App } from './app.container';

import Theme from './theme';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
  resolvers,
  typeDefs
});

client.writeData({
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount: 0,
    itemTotal: 0,
    currentUser: null
  }
});

ReactDOM.render(
  <Theme>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </Theme>,
  document.getElementById('root')
);
