import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import { Route, Switch, Redirect } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./reducer/user/user.actions";

export class App extends React.Component {
  unSubscribeFromAuth = null; // used for unsubscribing the onAuthStateChanged()

  // these code allows us to subscribe to firebase authService and recognise any new user login
  // here once the user is sign-in, util we manually sign-out, the user will remain sign even when we refresh the page.
  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // this connect our app with the firebase authentication system.
      // this is an open subscription , means it will always connected with firebase as long as our component is mounted on the DOM.

      console.log("USER  AUTH :", userAuth);

      const { setCurrrentUser } = this.props;

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrrentUser(
            {
              id: snapShot.id,
              ...snapShot.data(),
            }
            /* () => console.log(this.state) */
          );
        });
      } else {
        setCurrrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    // this will close the above subscription when the component is unmounted.
    this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/shop" exact component={ShopPage} />
          <Route
            path="/signin"
            exact
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
