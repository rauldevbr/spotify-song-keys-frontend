import React, { Component, Suspense, lazy } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
//import SpotifySongKeys from './containers/SpotifySongKeys/SpotifySongKeys';
const SpotifySongKeys = lazy(() => import('./containers/SpotifySongKeys/SpotifySongKeys'));

class App extends Component {

  constructor() {
    super();
    const params = this.getHashParams();

    this.token = params.access_token;
    this.loggedIn = this.token ? true : false;
  }

  getHashParams = function () {
    var hashParams = {}; 
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
          <Layout>
            <Switch>
              <Route path='/home'
                render={props =>
                  <SpotifySongKeys
                    {...props}
                    loggedIn={this.loggedIn}
                    token={this.token} />} />
              <Route path='/' exact component={Login} />
            </Switch>
          </Layout>
        </div>
      </Suspense>
    );
  }
}

export default App;
