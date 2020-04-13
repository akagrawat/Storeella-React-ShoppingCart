import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  unSubscribedFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unSubscribedFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: { id: snapShot.id, ...snapShot.data() }
          }, () => { console.log(this.state) });
        });

      }
      setCurrentUser(userAuth)
    });
  }

  componentWillUnmount() {
    this.unSubscribedFromAuth();
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) =>
  ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
  });
export default connect(null, mapDispatchToProps)(App);


