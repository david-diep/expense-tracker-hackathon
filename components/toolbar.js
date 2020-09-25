import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { teal } from '@material-ui/core/colors';

const useStyles = makeStyles({
  shorterToolbar: {
    minHeight: 36,
    padding: '.5rem',
    background: teal
  }
});

export default function TitleBar(props) {
  const classes = useStyles();
  return (
    <>

      <CssBaseline />
        <AppBar>

        <Toolbar className={classes.shorterToolbar} >
            <Typography variant="h6">App Bar</Typography>
          </Toolbar>
        </AppBar>


    </>
  );
  }
