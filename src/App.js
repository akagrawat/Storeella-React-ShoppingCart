import React, { useEffect } from 'react';
import HomePage from './pages/homepage/homepage.component';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

const App = ({ currentUser, setCurrentUser }) => {
  let unSubscribedFromAuth = null;
  let userId = null;

  useEffect(() => {
    unSubscribedFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          userId = snapShot.id;
          setCurrentUser({
            currentUser: { id: snapShot.id, ...snapShot.data() }
          }, () => { console.log(currentUser) });
        });
      }
      setCurrentUser(userAuth);
    });
    return () => {
      unSubscribedFromAuth();
    }
  }, [userId]
  )

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="/signin" render={() => currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)} />
      </Switch>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) =>
  ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
  });

export default connect(mapStateToProps, mapDispatchToProps)(App);


