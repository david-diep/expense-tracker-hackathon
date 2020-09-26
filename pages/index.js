import React, { useEffect } from 'react';
import clsx from 'clsx';
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
import Box from '@material-ui/core/Box';
import { spacing } from '@material-ui/system';
import AccountListItem from '../components/accountListItem';
import AccountPage from '../components/accountPage';
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
  },
  deletePopover: {
    padding: '.3rem',
    border: '1px solid black',
    width: '240px'
  },
}));

export default function Index() {
  const classes = useStyles();
  const theme = useTheme();
  //drawer state
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const [accounts, setAccounts] = React.useState([{ accName: "Default", id: 1, expenses: [
                                                  { expName: "Lunch", date: "9/24", description: "McDonalds", amount: 6.00} ]}
                                                ]);
  const [accId, setAccId] = React.useState(2);
  const [view, setView] = React.useState('home');

  const [focusId, setFocusId] = React.useState(null);

  const clearFocus = () => {
    setFocusId(null);
  }
  const setFocus = (id) => {
    setFocusId(id);
  }

  const refreshSide = () => {
    setAccounts(prevAccounts=>prevAccounts);
    console.log("refreshing")
  }

  const addAccount = () => {
    setAccounts(prevAccounts => prevAccounts.concat([{
      accName: "New Account", id: accId, expenses: []
    }]))
    setAccId(prevAccId => prevAccId + 1);
  }

  const deleteAccount = (id) => {
    setView("home");
    setAccounts(prevAccounts => {
      const deleteIndex = prevAccounts.findIndex((account) => account.id === id);
      prevAccounts.splice(deleteIndex, 1);
      return [...prevAccounts];
    })

  }


  const onEditChange = (value, id) => {
      setAccounts((prevAccounts)=>{
        const changeIndex=prevAccounts.findIndex((account)=>account.id===id);
        let toChange = prevAccounts[changeIndex]
        toChange.accName=value;
        prevAccounts.splice(changeIndex,1,toChange);
        return prevAccounts;
    })
  }

  useEffect(()=>{refreshSide()})

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
              onClick={handleDrawerToggle}
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
            <IconButton onClick={handleDrawerToggle}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <Button
            onClick={()=>addAccount()}
            className={classes.addAccButton}
            variant="outlined"
            color="primary"
            endIcon={<AddCircleIcon/>}>
            Add Account
          </Button>
          <List>
            {accounts.map((account) => (
              <AccountListItem
               key={account.id}
               account = {account}
               deleteAccount={deleteAccount}
                />
            ))}
          </List>

        </Drawer>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {<AccountPage

          /> && view!=="home"}

        </main>
      </div>
    </>
  );
}
