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
import CategoryIcon from '@material-ui/icons/Category';
import CategoryPage from '../components/categoryPage';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#f5f5f5',
    height: "100%",
    maxHeight: "100%",
    [theme.breakpoints.up('sm')]: {
      height:"100vh"
    },
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
    [theme.breakpoints.up('sm')]: {
    flexShrink: 0,
    },

    [theme.breakpoints.down('sm')]: {
      flexShrink: 1,
      paddingTop: '10%',
    },
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
    // flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    // [theme.breakpoints.up('md')]: {
    //   height: '100vh',
    // },
    height: '100%',
    width:'100%',
    background: '#ADD8E6',
    backgroundSize: 'cover',
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

  const [accounts, setAccounts] = React.useState({
      "1":{ accName: "Default", id: 1 },
    "2": { accName: "Second", id: 2 },
    "3": { accName: "Third", id: 3 },
    });
  const [expenses, setExpenses] = React.useState({
    "1": [{ expenseId: 1, expName: "Lunch", description: "McDonalds", date: new Date(), category: 1, amount: 6.00 },
      { expenseId: 4, expName: "Movie", description: "Monsters Inc", date: new Date(), category: 2, amount: 4.99 },
      { expenseId: 8, expName: "Games", description: "Slay the Spire", date: new Date(), category: 2, amount: 9.00 },
      { expenseId: 9, expName: "Games", description: "League of Legends", date: new Date(), category: 2, amount: 20.00 },
    ],
    "2": [{ expenseId: 2, expName: "Dinner", description: "Steak", date: new Date(), category: 1, amount: 16.00 },
      { expenseId: 5, expName: "Rent", description: "October", date: new Date('10-01-20'), category: 4, amount: 850.00 },
      { expenseId: 10, expName: "Family", description: "Boba", date: new Date('10-10-20'), category: 6, amount: 7.00 }
  ],
    "3": [{ expenseId: 3, expName: "Internet", description: "TWC", date: new Date('11-01-20'), category: 4, amount: 64.99 },
      { expenseId: 6, expName: "Road Trip", description: "Yosemite", date: new Date('11-05-20'), category: 5, amount: 405.41 },
      { expenseId: 7, expName: "Winter Clothes", description: "Uniqlo", date: new Date('11-04-20'), category: 3, amount: 98.90 }
  ],
  })

  const [newAccId, setNewAccId] = React.useState(4);
  const [newExpenseId, setNewExpenseId]= React.useState(11);
  const [view, setView] = React.useState("overview");
  const [focusTarget, setFocusTarget] = React.useState(null);
  const [categories, setCategories] = React.useState(
    {
      "1": { name: "Food", id: 1, color:'#008000'},
      "2": { name: "Entertainment", id: 2, color: '#800000' },
      "3": { name: "Clothing", id: 3, color: '#00FF00'},
      "4": { name: "Bills", id: 4, color: '#00FFFF'},
      "5": { name: "Travel", id: 5, color: '#808080'},
      "6": { name: "Other", id: 6, color: '#000000' },
    })
  const [newCategoryId, setNewCategoryId] = React.useState(7)

  useEffect(()=>{
    const accountsJSON = window.localStorage.getItem('bb-accounts')
    const expensesJSON = window.localStorage.getItem('bb-expenses')
    const categoriesJSON = window.localStorage.getItem('bb-categories')
    const newAccIdJSON = window.localStorage.getItem('bb-newAccId')
    const newExpenseIdJSON = window.localStorage.getItem('bb-newExpenseId')
    const newCategoryIdJSON = window.localStorage.getItem('bb-newCategoryId')

    if (accountsJSON && expensesJSON && newAccIdJSON && newExpenseIdJSON &&categoriesJSON && newCategoryIdJSON) {
      setAccounts(JSON.parse(accountsJSON))
      setExpenses(JSON.parse(expensesJSON))
      setCategories(JSON.parse(categoriesJSON))
      setNewAccId(JSON.parse(newAccIdJSON))
      setNewExpenseId(JSON.parse(newExpenseIdJSON))
      setNewCategoryId(JSON.parse(newCategoryIdJSON))
    }
  },[])

  useEffect(() => {
    window.localStorage.setItem('bb-accounts', JSON.stringify(accounts));
    window.localStorage.setItem('bb-expenses', JSON.stringify(expenses));
    window.localStorage.setItem('bb-categories', JSON.stringify(categories));
    window.localStorage.setItem('bb-newAccId', JSON.stringify(newAccId));
    window.localStorage.setItem('bb-newExpenseId', JSON.stringify(newExpenseId));
    window.localStorage.setItem('bb-newCategoryId', JSON.stringify(newCategoryId));
  })

  const setFocus = (id) => {
    setFocusTarget(accounts[id]);
    setView("account");
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
    setView("overview");
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

  const deleteExpense = (accId, expenseId) => {
    setExpenses((prevExpenses)=>{
      const deleteIndex = prevExpenses[accId].findIndex((expense) => expense.expenseId === expenseId)
      prevExpenses[accId].splice(deleteIndex,1)
      return {...prevExpenses};
    })
  }

  const addCategory = (name, color) => {
    setCategories(prevCategories => {
      prevCategories[newCategoryId] = { name: name, id: newCategoryId, color:color };
      setNewCategoryId(newCategoryId+1)
      return { ...prevCategories };
    })

  }

  const editCategory = (name,id) => {
    setCategories(prevCategories => {
      prevCategories[id].name = name;
      return { ...prevCategories };
    })
  }

  const deleteCategory = (id) => {
    setCategories(prevCategories => {
      delete prevCategories[id];
      return {...prevCategories};
    })
  }

  const getAccountName = (accId) => {
    return accounts[accId].accName;
  }

  const renderMain = () => {
    if (view ==="account"){
     return  (
     <AccountPage
      getAccountName={getAccountName}
      account={focusTarget}
      focusId={focusTarget.id}
      expenses={expenses[focusTarget.id]}
      editAccountName={editAccountName}
      addExpense={addExpense}
      editExpense={editExpense}
      deleteExpense={deleteExpense}
      categories = {categories}
      />)
    } else if (view==="category"){
      return (
      <CategoryPage
        categories={categories}
        addCategory={addCategory}
        editCategory={editCategory}
        deleteCategory={deleteCategory}
      />)
    }
    else {
      return (
        <OverviewPage
          expenses={expenses}
          accounts={accounts}
          categories={categories}
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
              <Typography variant="h6" noWrap onClick={() => setView('overview')}>
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
          <ListItem button onClick={() => setView("overview")}>
            <ListItemText primary = {'Overview'}>
            </ListItemText>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
          </ListItem>
          <Divider />
          <ListItem button onClick= {()=>setView('category')}>
            <ListItemText primary = {'Manage Categories'}></ListItemText>
            <ListItemIcon>
              <CategoryIcon />
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
