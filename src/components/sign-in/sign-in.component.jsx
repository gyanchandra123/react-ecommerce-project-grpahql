import "./sign-in.style.scss";
import { signInWithGoogle } from "../../firebase/firebase.utils";
import React, { Component } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      email: "",
      password: "",
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>sign in with your email and password</span>

        <form onSubmit={() => this.handleSubmit()}>
          <FormInput
            type="email"
            value={this.state.email}
            required
            name="email"
            label="email"
            handleChange={this.handleChange}
          />

          <FormInput
            type="password"
            value={this.state.password}
            required
            name="password"
            label="password"
            handleChange={this.handleChange}
          />

          <div className="buttons">
            <CustomButton type="submit">Submit Form </CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign in google
            </CustomButton>
          </div>
          
        </form>
      </div>
    );
  }
}

export default SignIn;
