import config from './config'
import React,  { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import KBRAppBar from './components/KBRAppBar'
import Home from './screens/Home'
import Game from './screens/Game'
import VideoBg from "reactjs-videobg";
import ogg from "./videos/Neon.ogg";
import webm from "./videos/Neon.webm";
import mp4 from "./videos/Neon.mp4";
// import poster from "./poster.jpg";

// import Unity, { UnityContext } from "react-unity-webgl";
// const unityContext = new UnityContext({
//   loaderUrl: "Build/SimpleWeb3Demo.loader.js",
//   dataUrl: "Build/SimpleWeb3Demo.data",
//   frameworkUrl: "Build/SimpleWeb3Demo.framework.js",
//   codeUrl: "Build/SimpleWeb3Demo.wasm",
// });


// unityContext.on("ConnectToMetaMask", (objectName, callback) => {
//   window.ethereum.request({method: "eth_requestAccounts"})
//     .then( function(accounts) {
//       window.accounts = accounts
//       console.log(accounts[0])
//       // unityInstance.SendMessage(parsedObjectName, parsedCallback, Pointer_stringify(accounts[0]));
//   })
// });

// unityContext.on("ApproveUSDC", (objectName, callback, stakeAmount) => {
//   approveUSDC(objectName, callback, stakeAmount);
// });



import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



import Account from './components/account';
// import Home from './components/home';
// import Header from './components/header';

import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  CONFIGURE,
  CONFIGURE_RETURNED,
  GET_BALANCES_PERPETUAL,
  GET_BALANCES_PERPETUAL_RETURNED
} from './constants'


import Store from "./stores";
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

function App() {

  const styles = theme => ({
    root: {
      display: 'flex'
    }
  })
  const [account, setAccount] = useState(null)


  useEffect(() => {
    const getBalancesReturned = () => {
      window.setTimeout(() => {
        dispatcher.dispatch({ type: GET_BALANCES_PERPETUAL, content: {} })
      }, 5000)
    }
  
    const configureReturned = () => {
      //dispatcher.dispatch({ type: GET_BALANCES_PERPETUAL, content: {} })
    }
  
    const connectionConnected = () => {
      setAccount(store.getStore('account'))
      dispatcher.dispatch({ type: CONFIGURE, content: {} })
      dispatcher.dispatch({ type: GET_BALANCES_PERPETUAL, content: {} })
    };
  
    const connectionDisconnected = () => {
      setAccount(store.getStore('account'))
    }

    emitter.on(CONNECTION_CONNECTED, connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected)
    emitter.on(CONFIGURE_RETURNED, configureReturned)
    emitter.on(GET_BALANCES_PERPETUAL_RETURNED, getBalancesReturned)

    return () => {
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected);
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected);
      emitter.removeListener(CONFIGURE_RETURNED, configureReturned);
      emitter.removeListener(GET_BALANCES_PERPETUAL_RETURNED, getBalancesReturned);
    }
  }, [])

  return (
    <div className="App">
      {/* <VideoBg>
        <VideoBg.Source src={ogg} type="video/ogg" />
        <VideoBg.Source src={webm} type="video/webm" />
        <VideoBg.Source src={mp4} type="video/mp4" />
      </VideoBg> */}
      {/* <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1"
        }}>
        <source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="vide/mp4" />
      </video> */}
      <Router>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <div className={ styles.root }>
          <CssBaseline />
          <KBRAppBar
            open={ false}
            appBarTitle={ "KBR Online!" }
            handleDrawerOpen={ false }
            handleAppBarIconClick={ null }
          />
          {/* <BackgroundVideo 
            src={'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'}
            poster={'http://il6.picdn.net/shutterstock/videos/3548084/thumb/1.jpg?i10c=img.resize(height:160)'}
          /> */}
          <Switch>
            <Route exact path="/" component={ Home }/>
            <Route exact path="/home" component={ Home }/>
            <Route exact path="/game" component={ Game} />
            {/* <Route exact path="/system-state" component={ SystemState} /> */}
          </Switch>
          {/* <Account /> */}
        </div>
      </Router>
    </div>
  );
}

export default App;
