import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'
import MailIcon from '@material-ui/icons/Mail'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { fade } from '@material-ui/core/styles/colorManipulator'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Badge from '@material-ui/core/Badge'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Button, Typography } from '@material-ui/core';

import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED
} from '../../constants'
import { toBech32 } from '@harmony-js/crypto'

import { useState, useEffect } from "react"
import Store from "../../stores";
const store = Store.store
const emitter = Store.emitter

const drawerWidth = 240

const styles = theme => ({
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    // flexGrow: 1
    align: "left"
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    }
  }
})

class KBRAppBar extends Component {

  connectionChanged () {
    console.log("CONNECTION CHANGED!!")
    this.setState({
      account: store.getStore('account')
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      account: 0
    };

    this.connectionChanged = this.connectionChanged.bind(this);
  }

  componentDidMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionChanged)
    emitter.on(CONNECTION_DISCONNECTED, this.connectionChanged)
  }

  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionChanged)
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionChanged)
  }
  
  render(){
    const { classes } = this.props
  
    var address = null;
    if (this.state.account.address) {
      address = toBech32(this.state.account.address)
      address = `${address.substring(0,6)}...${address.substring(address.length-4,address.length)}`
      console.log("ADDRESS: " + address);
    }

    
    return(
      <AppBar
        position="absolute"
        className={ 
          classNames(classes.appBar, this.props.open && classes.appBarShift) 
        }
      >
        <Toolbar 
          disableGutters={ !this.props.open } 
          className={ classes.toolbar }>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={ this.props.handleDrawerOpen }
            className={ classNames(
              classes.menuButton,
              this.props.open && classes.menuButtonHidden,
            ) }
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={ classes.title }
          >
            {/* { this.props.appBarTitle } */}
            Kawaii Battle Royale: Switch Blade
          </Typography>

          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div> */}

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <Button
              variant="contained" 
              color="secondary">ONE Wallet</Button>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-owns={'material-appbar'}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>

          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    )
  }
}

KBRAppBar.propTypes = {
  classes:          PropTypes.object.isRequired,
  open:             PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired
}

export default withStyles(styles)(KBRAppBar)