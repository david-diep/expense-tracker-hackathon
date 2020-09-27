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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import Box from '@material-ui/core/Box';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AccountListItem from '../components/accountListItem';
import AccountPage from '../components/accountPage';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#f5f5f5',
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
    display:'flex',
    justifyContent:'center',
    paddingTop:'5%',
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    [theme.breakpoints.up('md')]: {
      height: '100vh',
    },
    background: '#ADD8E6',
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

  const [accounts, setAccounts] = React.useState([{ accName: "Default", id: 1, expenseId:2 }]);
  const [expenses, setExpenses] = React.useState({"1": [
    { expenseId: 1, expName: "Lunch", description: "McDonalds", date: new Date('2020-09-24'), category: "Food", amount: 6.00 }]})
  const [accId, setAccId] = React.useState(2);


  const [viewAccount, setViewAccount] = React.useState(false);

  const [focusTarget, setFocusTarget] = React.useState(null);

  const clearFocus = () => {
    setFocusTarget(null);
  }

  const setFocus = (id) => {
    const focusIndex = accounts.findIndex((account) => account.id === id)
    setFocusTarget({...accounts[focusIndex]});
    setViewAccount(true);
  }

  const goHome = () => {
    setViewAccount(false);
    clearFocus();
  }


  const addAccount = () => {
    setAccounts(prevAccounts => prevAccounts.concat([{
      accName: "New Account", id: accId, expenseId:1, expenses: []
    }]))
    setAccId(prevAccId => prevAccId + 1);
  }

  const deleteAccount = (id) => {
    setViewAccount(false);
    setAccounts(prevAccounts => {
      const deleteIndex = prevAccounts.findIndex((account) => account.id === id);
      prevAccounts.splice(deleteIndex, 1);
      return [...prevAccounts];
    })

  }

  const onEditChange = (name, id) => {
      setAccounts((prevAccounts)=>{
        const changeIndex=prevAccounts.findIndex((account)=>account.id===id);
        let toChange = prevAccounts[changeIndex]
        toChange.accName=name;
        prevAccounts.splice(changeIndex,1,toChange);
        return [...prevAccounts];
    })
  }

  const renderMain = () => {
    if (viewAccount){
     return  <AccountPage
        account={focusTarget}
        expenses={expenses[focusTarget.id]}
      />
    }
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
              onClick={handleDrawerToggle}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <Typography variant="h6" noWrap onClick={() => goHome()}>
                Budget Buddy
              </Typography>
              <LocalAtmIcon style={{marginLeft: "5px"}}/>
            </div>

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
          <ListItem button onClick={()=>goHome()}>
            <ListItemText primary = {'Home'}>
            </ListItemText>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
          </ListItem>
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
               setFocus = {setFocus}
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
          {renderMain()}

        </main>
      </div>
    </>
  );
}
