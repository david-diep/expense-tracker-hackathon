
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import DeleteIcon from '@material-ui/icons/Delete';

import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles(() => ({
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

  const [anchorDelete, setAnchorDelete] = React.useState(null);
  const deleteOpen = Boolean(anchorDelete);

  const handleOpenDelete = (event) => {
    event.persist()
    setAnchorDelete(event.currentTarget);
  }

  const handleCloseDelete = () => {
    setAnchorDelete(null);
  }

  return (
    <ListItem onClick={() => props.setFocus(props.account.id)} button>
      <ListItemText primary={props.account.accName} />
      <ListItemSecondaryAction>
        <IconButton aria-label="delete" onClick={(event) => {handleOpenDelete(event)}}>
          <DeleteIcon />
        </IconButton>
        <Popover

          open={deleteOpen}
          anchorEl={anchorDelete}
          onClose={handleCloseDelete}

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
              onClick={() => { handleCloseDelete(); props.deleteAccount(props.account.id);}}
            >
              Delete
            </Button>
          </Box>
        </Popover>

      </ListItemSecondaryAction>

    </ListItem>
  )
          }
