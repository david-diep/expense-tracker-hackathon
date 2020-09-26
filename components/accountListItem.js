
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles((theme) => ({
  addAccButton: {
    width: '93%',
    margin: '5px auto 5px auto'
  },
  deletePopover: {
    padding: '.3rem',
    border: '1px solid black',
    width: '240px'
  },
}));

export default function AccountListItem(props) {
  const classes = useStyles();
  const idFirm = JSON.parse(JSON.stringify({id:props.account.id}));

  return (
    <ListItem onClick={() => console.log(props.account.id,' primary pressed',idFirm.id)} button>
      <ListItemText primary={props.account.accName} />
      <ListItemSecondaryAction>
        <IconButton aria-label="delete" onClick={(event) => props.handleOpenDelete(event)}>
          <DeleteIcon />
        </IconButton>
        <Popover
          id={props.account.id}
          open={props.deleteOpen}
          anchorEl={props.anchorDelete}
          onClose={props.handleCloseDelete}

          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box
            className={classes.deletePopover}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography align="center">
              Are you sure you want to delete account: {props.account.accName}?
            </Typography>
            <Button variant="contained" color="secondary" style={{
              marginTop: '5px', background: '#FF0000'
            }}

              onClick={() => {console.log(idFirm, "testing")}}
            >
              Delete
            </Button>
          </Box>
        </Popover>

      </ListItemSecondaryAction>

    </ListItem>
  )
          }
