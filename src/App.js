import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import { Route } from "react-router-dom"; 

const HatPage = () => {
  return <div>HAT PAGE</div>;
};

function App() {
  return (
    <div>
      <Route path="/" exact component={HomePage} />
      <Route path="/shop/hats" exact component={HatPage} /> 
    </div>
  );
}

export default App;
