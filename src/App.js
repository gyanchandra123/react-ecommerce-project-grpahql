import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import { Route, Switch } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth } from "./firebase/firebase.utils";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  unSubscribeFromAuth = null; // used for unsubscribing the onAuthStateChanged()

  // these code allows us to subscribe to firebase authService and recognise any new user login
  // here once the user is sign-in, util we manually sign-out, the user will remain sign even when we refresh the page.
  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged((user) => {
      // this connect our app with the firebase authentication system.
      // this is an open subscription , means it will always connected with firebase as long as our component is mounted on the DOM.
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  componentWillUnmount() {
    // this will close the above subscription when the component is unmounted.
    this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/shop" exact component={ShopPage} />
          <Route path="/signin" exact component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
