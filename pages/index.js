import React from 'react';
import clsx from 'clsx';
import Head from 'next/head'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background: '#2E3B55',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  addAccButton:{
    width:'93%',
    margin: '5px auto 5px auto'
  }, editPopover:{
    padding: 2
  },
}));

export default function Index() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEdit, setAnchorEdit] = React.useState(null);
  const [accounts, setAccounts] = React.useState([{ accName: "Default", id: 1, expenses: [
                                                  { expName: "Lunch", date: "9/24", description: "McDonalds", amount: 6.00} ]}
                                                ]);
  const [view, setView] = React.useState('home');
  const [accId, setAccId] = React.useState(2);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = (event) => {
    event.persist();
    setAnchorEdit(event.currentTarget);
  }
  const handleCloseEdit = () => {
    setAnchorEdit(null);
  }
  const handleSaveEdit = () => {

  }

  const addAccount = () => {
    setAccounts(prevAccounts => prevAccounts.concat([{
      accName: "Default", id: accId, expenses: []
    }]));
    setAccId(prevAccId => prevAccId + 1);
  }

  const editOpen = Boolean(anchorEdit);
  const onEditChange = (value, id) => {
      setAccounts((prevAccounts)=>{
        const changeIndex=prevAccounts.findIndex((account)=>account.id===id);
        let toChange = prevAccounts[changeIndex]
        toChange.accName=value;
        prevAccounts.splice(changeIndex,1,toChange);
        return prevAccounts;
    })
  }

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })
        }
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Expenses Light
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <Button onClick={()=>addAccount()} className={classes.addAccButton} variant="outlined" color="primary" endIcon={<AddCircleIcon/>}>
            Add Account
          </Button>
          <List>
            {accounts.map((account) => (
              <ListItem onClick={()=>console.log('primary pressed')} button key={account.id}>
                <ListItemText primary={account.accName} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="edit" onClick={(event) => handleOpenEdit(event)}>
                    <CreateIcon />
                  </IconButton>
                  <Popover
                    id={account.id}
                    open={editOpen}
                    anchorEl={anchorEdit}
                    onClose={handleCloseEdit}
                    className={classes.editPopover}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}>
                    <input value={account.accName} onChange={(value)=>onEditChange(value,account.id)}></input>
                  </Popover>
                  <IconButton aria-label="delete" onClick={() => console.log(account.id, 'delete pressed')}>
                    <DeleteIcon />
                  </IconButton>

                </ListItemSecondaryAction>

              </ListItem>
            ))}
          </List>

        </Drawer>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Typography paragraph>
            placeholder
          </Typography>

        </main>
      </div>
    </>
  );
}
