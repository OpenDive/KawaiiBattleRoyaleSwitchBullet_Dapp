  
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { CssBaseline } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
// import ROS2D from 'ros2d'
// import ROSLIB from 'roslib'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
// import AnimatedVideoCanvas from '../../components/AnimatedVideoCanvas';
// import OperationMode from '../../components/OperationMode'
// import RobotQuickView from '../../components/RobotQuickView'
import Account from '../../components/account';
import harmonyLogo from '../../assets/harmony.png';

import VideoBg from "reactjs-videobg";
import ogg from "../../videos/Neon.ogg";
import webm from "../../videos/Neon.webm";
import mp4 from "../../videos/Neon.mp4";
import demo1 from "../../videos/KBRDemo.mp4";


import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  CONFIGURE,
  CONFIGURE_RETURNED,
  GET_BALANCES_PERPETUAL,
  GET_BALANCES_PERPETUAL_RETURNED
} from '../../constants'


import Store from "../../stores";
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store


const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // padding: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    height: '100vh',
    overflow: 'auto'
  },
  tableContainer: {
    height: 320,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})

const stylesSnackbar = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

class Home extends Component {

  constructor(props) {
    super(props)
    // this.state = { 
    //   ros: undefined,
    //   viewer: undefined
    //  }
    this.state = {
      account: undefined
    }
    this.handleClose = this.handleClose.bind(this)
    this.showSnackBar = this.showSnackBar.bind(this)

    this.getBalancesReturned = this.getBalancesReturned.bind(this);
    this.configureReturned = this.configureReturned.bind(this);
    this.connectionConnected = this.connectionConnected.bind(this);
    this.connectionDisconnected = this.connectionDisconnected.bind(this);
    this.switchRoute = this.switchRoute.bind(this);
  }

  switchRoute() {
    this.props.history.push('/Game')
  }


  getBalancesReturned() {
      window.setTimeout(() => {
        dispatcher.dispatch({ type: GET_BALANCES_PERPETUAL, content: {} })
      }, 5000)
  }
  
  configureReturned() {
      //dispatcher.dispatch({ type: GET_BALANCES_PERPETUAL, content: {} })
  }
  
  connectionConnected() {
      this.setState({
        account: store.getStore('account')
      })
      dispatcher.dispatch({ type: CONFIGURE, content: {} })
      dispatcher.dispatch({ type: GET_BALANCES_PERPETUAL, content: {} })

      this.switchRoute();
  };
  
  connectionDisconnected() {
    this.setState({
      account: store.getStore('account')
    })
  }

  handleClose() {
    this.setState({
      ...this.state,
      open: false,
    });
  }

  showSnackBar(msg) {
    console.log('MSG: ' + msg)
    this.setState({
      msg: msg,
      open: true,
      vertical: 'bottom',
      horizontal: 'right',
      Transition: SlideTransition
    })
  }

  // componentWillMount() {
  // }

  componentWillUnmount() {
    // this.ros.close()
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.removeListener(CONFIGURE_RETURNED, this.configureReturned);
    emitter.removeListener(GET_BALANCES_PERPETUAL_RETURNED, this.getBalancesReturned);
  }

  componentDidMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected)
    emitter.on(CONFIGURE_RETURNED, this.configureReturned)
    emitter.on(GET_BALANCES_PERPETUAL_RETURNED, this.getBalancesReturned)

    // this.ros = new ROSLIB.Ros({
    //   url: 'ws://localhost:9090'
    // })
    
    // this.ros.on('connection', () => {
    //   this.showSnackBar('Websocket connection established')
    // })

    // this.ros.on('error', (error) => {
    //   console.log('ERROR MSG: ' + JSON.stringify(error))
    //   this.showSnackBar('Error connecting to websocket server')
    // })

    // ros.on('close', () => {
    //   this.showSnackBar('Closing wesocket connection')
    // })

    // this.setState({
    //   ros: ros
    // })

    // var viewer = new ROS2D.Viewer({
    //   divID: 'nav',
    //   width: 800,
    //   height: 600
    // })
    // this.setState({
    //   viewer: viewer
    // })

    // var gridClient = new ROS2D.OccupancyGridClient({
    //   ros: ros,
    //   rootObject: viewer.scene
    // })

    // gridClient.on('change', function() {
    //   viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height)
    // })
  }

  render() {
    const { classes } = this.props
    const fab = {
      color: 'secondary',
      className: classes.fab,
      icon: <AddIcon />
    }

    return(
      <main className={ classes.content }>
        <VideoBg>
          {/* <VideoBg.Source src={ogg} type="video/ogg" />
          <VideoBg.Source src={webm} type="video/webm" /> */}
          <VideoBg.Source src={demo1} type="video/mp4" />
        </VideoBg>
        <div className={ classes.appBarSpacer } />
        <Grid 
          container 
          spacing={3}
          justify='flex-start'
          alignItems='flex-start'>
          <Grid item xs={12} sm={6}>
            {/* <Paper className={classes.paper}> */}
              <CssBaseline/>
              {/* <AnimatedVideoCanvas 
                width={640}
                height={420}
                src='http://localhost:8080/stream?topic=/camera/depth/image_raw&type=png'
              /> */}
            {/* </Paper> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <Paper className={classes.paper}> */}
            {/* <AnimatedVideoCanvas 
                width={640}
                height={420}
                src='http://localhost:8080/stream?topic=/camera/rgb/image_raw&quality=50'
              /> */}
            {/* </Paper> */}
          </Grid>
          <Grid item xs={12} sm={4}>
          {/* <Paper className={classes.paper}> */}
            {/* <RobotQuickView /> */}
          {/* </Paper> */}
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* <Paper> */}
                {/* Robot State View */}
                {/* <CardMedia
                  className={classes.media}
                  image={harmonyLogo}
                  title="Contemplative Reptile"
                /> */}
                {/* <img alt='Harmony logo' src={harmonyLogo} />
                 */}
                {/* <Account /> */}

                
            {/* </Paper> */}
            <Card className={classes.root}>
              <CardActionArea>
                {/* <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="20"
                  image={harmonyLogo}
                  title="Contemplative Reptile"
                /> */}
                <img alt='Harmony logo' src={harmonyLogo} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Powered by Harmony
                  </Typography>
                  {/* <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography> */}
                  <Account /> 
                </CardContent>
              </CardActionArea>
              {/* <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions> */}
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* <Paper className={classes.paper}>
            </Paper> */}
            {/* <OperationMode /> */}
          </Grid>
        </Grid>
        <Fab className={ fab.className } color={ fab.color }>
              { fab.icon }
        </Fab>
        <Snackbar
          anchorOrigin={{ vertical: this.state.vertical, horizontal: this.state.horizontal }}
          key={`${this.state.vertical},${this.state.horizontal}`}
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.msg}</span>}
        />
      </main>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)