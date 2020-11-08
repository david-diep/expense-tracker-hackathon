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
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AccountListItem from '../components/accountListItem';
import AccountPage from '../components/accountPage';
import OverviewPage from '../components/overviewPage';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#f5f5f5',
    height: "100%"
  },
  appBar: {
    background: '#2E3B55',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  // [theme.breakpoints.down('sm')]: {
  //   flexGrow: 0,
  //   paddingTop: '10%',
  // },
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
    // [theme.breakpoints.up('md')]: {
    //   height: '100vh',
    // },
    height: '100vh',
    width:'100%',
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

  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const [accounts, setAccounts] = React.useState({"1":{ accName: "Default", id: 1 }});
  const [expenses, setExpenses] = React.useState({"1": [
    { expenseId: 1, expName: "Lunch", description: "McDonalds", date: new Date(), category: "Food", amount: 6.00 }]})
  const [newAccId, setNewAccId] = React.useState(2);
  const [newExpenseId, setNewExpenseId]= React.useState(2);

  const [viewAccount, setViewAccount] = React.useState(false);

  const [focusTarget, setFocusTarget] = React.useState(null);


  useEffect(()=>{
    const accountsJSON = window.localStorage.getItem('bb-accounts')
    const expensesJSON = window.localStorage.getItem('bb-expenses')
    const newAccIdJSON = window.localStorage.getItem('bb-newAccId')
    const newExpenseIdJSON = window.localStorage.getItem('bb-newExpenseId')
    if (accountsJSON && expensesJSON && newAccIdJSON && newExpenseIdJSON) {
      setAccounts(JSON.parse(accountsJSON))
      setExpenses(JSON.parse(expensesJSON))
      setNewAccId(JSON.parse(newAccIdJSON))
      setNewExpenseId(JSON.parse(newExpenseIdJSON))
    }
  },[])

  useEffect(() => {
    window.localStorage.setItem('bb-accounts', JSON.stringify(accounts));
    window.localStorage.setItem('bb-expenses', JSON.stringify(expenses));
    window.localStorage.setItem('bb-newAccId', JSON.stringify(newAccId));
    window.localStorage.setItem('bb-newExpenseId', JSON.stringify(newExpenseId));
  })

  const clearFocus = () => {
    setFocusTarget(null);
  }

  const setFocus = (id) => {
    setFocusTarget(accounts[id]);
    setViewAccount(true);
  }

  const goHome = () => {
    setViewAccount(false);
    clearFocus();
  }


  const addAccount = () => {
    setAccounts(prevAccounts => {
      prevAccounts[newAccId] = { accName: "New Account", id: newAccId}
      return {...prevAccounts};
  })
    setExpenses(prevExpenses => {
      prevExpenses[newAccId] = [];
      return { ...prevExpenses };
    }
      )
    setNewAccId(prevAccId => prevAccId + 1);
  }

  const deleteAccount = (id) => {
    setViewAccount(false);
    setAccounts(prevAccounts => {
      delete prevAccounts[id];
      return {...prevAccounts};
    })
    setExpenses(prevExpenses=>{
      delete prevExpenses[id];
      return {...prevExpenses};
    })

  }

  const editAccountName = (name, id) => {
      setAccounts((prevAccounts)=>{
        prevAccounts[id].accName=name;
        return {...prevAccounts};
    })
  }


  const addExpense = (accId, expense) => {
    expense.expenseId=newExpenseId
    setExpenses((prevExpenses)=>{
      prevExpenses[accId].push(expense);
      return {...prevExpenses};
    })
    setNewExpenseId(prevExpenseId=>prevExpenseId+1)
  }

  const editExpense = (accId, expenseId, expense) =>{
    setExpenses((prevExpenses) => {
      const changeIndex = prevExpenses[accId].findIndex((expense) => expense.expenseId=== expenseId);
      prevExpenses[accId].splice(changeIndex, 1, expense);
      return {...prevExpenses}
    })
  }

  const getAccountName = (accId) =>{
    return accounts[accId].accName;
  }

  const deleteExpense = (accId, expenseId) => {
    setExpenses((prevExpenses)=>{
      const deleteIndex = prevExpenses[accId].findIndex((expense) => expense.expenseId === expenseId)
      prevExpenses[accId].splice(deleteIndex,1)
      return {...prevExpenses};
    })
  }

  const renderMain = () => {
    if (viewAccount){
     return  <AccountPage
       getAccountName={getAccountName}
        account={focusTarget}
        expenses={expenses[focusTarget.id]}
        editAccountName={editAccountName}
        addExpense={addExpense}
        editExpense={editExpense}
        deleteExpense={deleteExpense}
      />
    } else{
      return (
        <OverviewPage
          expenses={expenses}
          accounts={accounts}
        />
      )
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
            <ListItemText primary = {'Overview'}>
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
            {Object.values(accounts).map((account) => (
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
