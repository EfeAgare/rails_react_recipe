import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import React from 'react';


import Home from "../components/Home";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </Router>
);