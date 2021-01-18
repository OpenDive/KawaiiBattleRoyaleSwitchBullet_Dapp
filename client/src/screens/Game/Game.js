import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Paper } from '@material-ui/core';
import Box from "@material-ui/core/Box";

import VideoBg from "reactjs-videobg";
import ogg from "../../videos/Neon.ogg";
import webm from "../../videos/Neon.webm";
import mp4 from "../../videos/Neon.mp4";
import demo1 from "../../videos/KBRDemo.mp4";

import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  APPROVE_STAKE_TO_PLAY_BUSD,
  TRANSFER_STAKE_TO_PLAY_BUSD,
  APPROVE_STAKE_TO_TOURNAMENT_BUSD,
  TRANSFER_STAKE_TO_TOURNAMENTPLAY_BUSD,
} from '../../constants'

import Store from "../../stores";
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(4),
  },
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing(8, 0, 6),
    // padding: theme.spacing(20, 0, 6),
    padding: theme.spacing(10, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const unityContext = new UnityContext({
  loaderUrl: "unity/unity.loader.js",
  dataUrl: "unity/unity.data",
  frameworkUrl: "unity/unity.framework.js",
  codeUrl: "unity/unity.wasm",
});
 
const Game = () => {

  useEffect(() => {
    // const getBalancesReturned = () => {
    //   window.setTimeout(() => {
    //     dispatcher.dispatch({ type: GET_BALANCES_PERPETUAL, content: {} })
    //   }, 5000)
    // }
  
    const configureReturned = () => {
      //dispatcher.dispatch({ type: GET_BALANCES_PERPETUAL, content: {} })
    }
  
    const approveBUSD = () => {
      // setAccount(store.getStore('account'))
      // dispatcher.dispatch({ type: APPROVE_STAKE_TO_TOURNAMENT_BUSD, content: {} })
      // dispatcher.dispatch({ type: GET_BALANCES_PERPETUAL, content: {} })
    };
  }, [])

  // unityContext.on("ConnectToOneWallet",(objectName, callback, stakeAmount) => {
  //   window.ethereum.request({method: "eth_requestAccounts"})
  //     .then( function(accounts) {
  //       window.accounts = accounts
  //       console.log(accounts[0])
  //       unityContext.SendMessage(parsedObjectName, parsedCallback, Pointer_stringify(accounts[0]));
  //   })
  // });

  unityContext.on("ApproveBUSD", (objectName, callback, stakeAmount) => {
    dispatcher.dispatch({ type: APPROVE_STAKE_TO_TOURNAMENT_BUSD, content: {} })
    // unityContext.send(objectName, "ApproveBUSDCallback", "NONE");
    // approveBUSD(objectName, callback, stakeAmount);
    
  });

  unityContext.on("StakeEntry", (objectName, callback, stakeAmount) => {
    // dispatcher.dispatch({ type: APPROVE_STAKE_TO_TOURNAMENT_BUSD, content: {} })
    unityContext.send(objectName, "StakeEntryCallback", "NONE");
  });

  
  // const approveBUSD = async (objectName, callback, stakeAmount) => {

  //   let value = "100000";
  //   let name = "USD Coin";

    // usdContract.methods.approve(config.usdContract.address, "100000")
    //   .send({from: setSelectedAddress})
    //   .on('error', function(error) {
    //     console.log('ERROR: ');
    //     console.log(error);
    //   })
    //   .on('receipt', function(receipt) {
    //     console.log('RECEIPT: ');
    //     console.log(receipt);
    // })
  // }
  const classes = useStyles();


  const [progression, setProgression] = React.useState()
  const [videoOn, setVideoOn] = React.useState()
  
  useEffect(() => {

    unityContext.on("progress", progression => {

      // Now we can use the progression to for example
      // display it on our React app.
      setProgression(progression);
      if(progression == 100) {
        setVideoOn(false);
      }
    });

  }, [unityContext, progression, videoOn])

  // <main> </main>
  return (
    // <div>
    //     <Unity unityContext={unityContext} />
    // </div>
        <div className={classes.heroContent}>
          <VideoBg loop={false}>
          <VideoBg.Source src={ogg} type="video/ogg" />
          <VideoBg.Source src={webm} type="video/webm" />
          <VideoBg.Source src={mp4} type="video/mp4" />
          </VideoBg>
          {/* <Container maxWidth="sm">
            <Paper
            className={classes.paper} 
            elevation={6}>
              <Box p={1}>
              <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              Stake to Play
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>

              </Box>
            </Paper>
          </Container> */}
          <Unity unityContext={unityContext} height="900px" width="1024" />
        </div>
    );
};

export default Game;
