import React from 'react'
import { IconButton, Box, Paper, Modal, Button, TextField, FormControl, InputLabel, Select, MenuItem, } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AccountTable from '../components/accountTable';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useEffect } from 'react';
import AddExpenseModal from './addExpenseModal'
import EditExpenseModal from './editExpenseModal'
import moment from 'moment'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.up('sm')]: {
    root: {
      width: '95%'
    },
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      width: '98%',
      paddingTop: '30px'
    }
  }
  ,
  title:{
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '20px'
    }
  },
  tableContainer:{
    marginTop:'15px',

  },
  titleRow: {
    display:'flex',
    justifyContent:'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexWrap:'wrap'
    }
  },
  modal: {
    margin: '10% auto',
    height: '30vh',
    width: '30vw',
    [theme.breakpoints.down('sm')]: {
      width: '70vw',
      height: '40vh'
    },
    background: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center'
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '30px'
  },
  options: {
    paddingBottom:'10px'
  },
  bigFont: {
  fontSize: '1.2rem'
}
}));

export default function AccountPage(props){

  const classes = useStyles();
  const [editAccount, setEditAccount] = React.useState(false);
  const [title, setTitle] = React.useState(props.account.accName);
  const [newExpenseModal, setNewExpenseModal] = React.useState(false);
  const [editFocus, setEditFocus] = React.useState(null);
  const [editExpenseModal, setEditExpenseModal] = React.useState(false);
  const [total, setTotal] = React.useState();
  const [mode, setMode] = React.useState("default")
  const [category, setCategory] = React.useState("")
  const [dateRange, setDateRange] = React.useState('day');
  const [date, setDate] = React.useState(new moment());

  const getRows = () => {
    let rows =[];
    if (mode === "default" || mode === 'category' && category === "") {
      rows = props.expenses.map(expense => ({
        expenseId: expense.expenseId,
        date: expense.date,
        expName: expense.expName,
        description: expense.description,
        category: props.categories[expense.category] === undefined ? "Deleted" : props.categories[expense.category].name,
        amount: expense.amount,
      }))
    } else if (mode === 'category') {
      rows = props.expenses.map(expense => {
        if (expense.category === category) {
          return {
            expenseId: expense.expenseId,
            date: expense.date,
            expName: expense.expName,
            description: expense.description,
            category: props.categories[expense.category] === undefined ? "Deleted" : props.categories[expense.category].name,
            amount: expense.amount,
          }
        }
      })
    } else if (mode === 'date') {
      var startDate = new moment(date);
      startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      let endDate = new moment(startDate);
      if (dateRange === 'month') {
        startDate.startOf('month');
        endDate.endOf('month')
      } else if (dateRange === 'week') {
        endDate.add(1, "weeks")
      } else { //dateRange === 'day'
        endDate.add(1, "day")
      }

      rows = props.expenses.map(expense => {
        if (moment(expense.date).isSameOrAfter(startDate) && moment(endDate).isSameOrAfter(expense.date)) {
          return {
            expenseId: expense.expenseId,
            date: expense.date,
            expName: expense.expName,
            description: expense.description,
            category: props.categories[expense.category] === undefined ? "Deleted" : props.categories[expense.category].name,
            amount: expense.amount,
          }
        }
        })
    }
    rows = rows.filter(expense => expense !== undefined)
    return rows;
  }


  useEffect(()=>{
    calculateTotal();
  })

  const calculateTotal = () => {
    let total=0;

    if (mode === "default" || mode === 'category' && category === "") {
      const reducer = (accumulator, expense) => accumulator + parseFloat(expense.amount);
        total += props.expenses.reduce(reducer, 0)


    } else if (mode === 'category') {

      const reducer = (accumulator, expense) => {
        if (expense.category === category) {
          return accumulator + parseFloat(expense.amount);
        } else {
          return accumulator;
        }
      };

        total += props.expenses.reduce(reducer, 0)

    }
    else if (mode === 'date') {
      var startDate = new moment(date);
      startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      let endDate = new moment(startDate);
      if (dateRange === 'month') {
        startDate.startOf('month');
        endDate.add(1, "months").startOf('month')
      } else if (dateRange === 'week') {
        endDate.add(1, "weeks")
      } else { //dateRange === 'day'
        endDate.add(1, "day")
      }

      const reducer = (accumulator, expense) => {
        if (moment(expense.date).isSameOrAfter(startDate) && moment(endDate).isSameOrAfter(expense.date)) {
          return accumulator + parseFloat(expense.amount);
        } else {
          return accumulator;
        }
      };

        total += props.expenses.reduce(reducer, 0)
    }

    setTotal(total);
  }


  const handleAccountEdit = () => {
    props.editAccountName(title,props.account.id);
    setEditAccount(false);
  }


  const handleEditExpense = (expense) => {
    setEditFocus(expense);
    setEditExpenseModal(true);
  }

  const renderEditModal = () => {
    if(editExpenseModal){
      return (<>
        <EditExpenseModal
          editFocus={editFocus}
          setEditFocus={setEditFocus}
          setEditExpenseModal={setEditExpenseModal}
          editExpenseModal={editExpenseModal}
          editExpense={props.editExpense}
          account={props.account}
          categories={props.categories}
        />
      </>)
    }
  }

  const renderSecondSelect = () => {

    if (mode === 'category') {

      return (
        <FormControl className={classes.formControl} style={{ marginLeft: '10px', minWidth: "120px" }}>
          <InputLabel id="select-category" className={classes.bigFont}>Category</InputLabel>
          <Select
            className={classes.bigFont}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Object.keys(props.categories).map((categoryId) => {
              return <MenuItem key={categoryId} value={props.categories[categoryId].id}>{props.categories[categoryId].name}</MenuItem>
            })}


          </Select>
        </FormControl>
      )
    }
    else if (mode === 'date') {
      let dateSelector;
      if (dateRange === 'month') {
        dateSelector = (
          <DatePicker
            format="MM/YYYY"
            openTo="month"
            views={["year", "month"]}
            label="Month and Year"
            value={date}
            onChange={date => setDate(date)}
            id="date-picker"
            label="Month"
            InputProps={{
              classes: {
                input: classes.bigFont,
              },
            }}
            InputLabelProps={{
              classes: {
                root: classes.bigFont,
              }
            }}
          />
        )
      } else {
        dateSelector = (
          <KeyboardDatePicker
            clearable
            format="MM/DD/YYYY"

            value={date}
            onChange={date => setDate(date)}
            id="date-picker"
            label={dateRange === 'week' ? "Week Starting Date" : 'Date'}
            InputProps={{
              classes: {
                input: classes.bigFont,
              },
            }}
            InputLabelProps={{
              classes: {
                root: classes.bigFont,
              }
            }}
          />)
      }
      return (
        <>
          <FormControl className={classes.formControl} style={{ marginLeft: '10px', minWidth: "120px" }}>

            <InputLabel id="date-sort" style={{ minWidth: "60px" }} className={classes.bigFont}>Date Range</InputLabel>
            <Select
              value={dateRange}
              onChange={(event) => setDateRange(event.target.value)}
              className={classes.bigFont}
            >
              <MenuItem value={'day'}>Day</MenuItem>
              <MenuItem value={'week'}>Week</MenuItem>
              <MenuItem value={'month'}>Month</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} style={{ marginLeft: '15px' }}>
            <MuiPickersUtilsProvider utils={MomentUtils} >
              {dateSelector}
            </MuiPickersUtilsProvider>
          </FormControl>
        </>
      )
    }
  }

  return (
  <Box className={classes.root}>
    <div className={classes.titleRow}>
        <div className={classes.title} >
          <h1>{title} </h1>
          <IconButton onClick={() => setEditAccount(true)}><EditIcon /></IconButton>

        </div >
      <div style={{marginRight:"10px"}}>
          {Boolean(total) && <h2>Total: ${total.toFixed(2)}</h2>}
      </div>
    </div>

      <div name="options" className={classes.options}>

        <FormControl className={classes.formControl} style={{ minWidth: "80px" }}>
          <InputLabel id="overview-sort" className={classes.bigFont}>View</InputLabel>
          <Select
            className={classes.bigFont}
            labelId="select-label"
            id="overview-sort"
            value={mode}
            onChange={(event) => setMode(event.target.value)
            }
          >
            <MenuItem value={'default'}>All</MenuItem>
            <MenuItem value={'category'}>Category</MenuItem>
            <MenuItem value={'date'}>Date</MenuItem>
          </Select>

        </FormControl>

        {renderSecondSelect()}

      </div>
      <Button onClick={() => setNewExpenseModal(true)} variant="contained" color="primary" endIcon={<AddCircleIcon />}>
        Add Expense
      </Button>
    <Box
      className={classes.tableContainer}
      >
        <AccountTable rows={getRows()}
          accountId={props.account.id}
          handleEditExpense={handleEditExpense}
          categories={props.categories}
          deleteExpense={props.deleteExpense}
          />
    </Box>
      <AddExpenseModal
        newExpenseModal={newExpenseModal}
        addExpense={props.addExpense}
        setNewExpenseModal={setNewExpenseModal}
        account={props.account}
        categories={props.categories}/>
      {renderEditModal()}
      <Modal
        open={editAccount}
        onClose={() => setEditAccount(false)}>
        <Paper className={classes.modal}>
          <form className={classes.modalContainer} onSubmit={handleAccountEdit}>
            <h2>Edit Account</h2>
            <TextField
              required
              id='accountName'
              name='accountName'
              InputProps={{
                classes: {
                  input: classes.bigFont,
                },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.bigFont,
                },
                shrink: true,
              }}

              value={title}
              onChange={(event) => setTitle(event.target.value)}

              label="Account Name"></TextField>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <Button type="submit" style={{ background: '#228B22', marginLeft: '5px' }}>Add</Button>
              <Button onClick={() => setEditAccount(false)} type="reset" style={{ background: '#FF0000', marginLeft: '5px' }}>Cancel</Button>
            </div>
          </form>
        </Paper>
      </Modal>
  </Box>
  )
}
