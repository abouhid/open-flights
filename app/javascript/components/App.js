import React from "react";
import { Route, Switch } from "react-router-dom";
import Airlines from "./Airlines/Airlines";
import Airline from "./Airline/Airline";
import Test from "./Airlines/Airline";

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Airlines />
      </Route>
      <Route exact path="/airlines/:slug" component={Airline} />
    </Switch>
  );
};

export default App;
