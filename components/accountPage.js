import React from 'react'
import { IconButton, Box, Paper, Modal, Button, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AccountTable from '../components/accountTable';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useEffect } from 'react';
import AddExpenseModal from './addExpenseModal'
import EditExpenseModal from './editExpenseModal'
import moment from 'moment'

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


  const rows = props.expenses.map((expense) => {
    return {
      expenseId: expense.expenseId,
      date: expense.date,
      expName: expense.expName,
      description: expense.description,
      category: props.categories[expense.category] === undefined ? "Deleted" : props.categories[expense.category].name,
      amount: expense.amount,
    }
  })

  useEffect(()=>{
    calculateTotal();
    // if(!editName){
    //   setTitle(props.getAccountName(props.account.id));
    // }
  })

  const calculateTotal = () => {
    let total=0;
    for(let i=0;i< props.expenses.length;i++){
      total +=parseFloat(props.expenses[i].amount);
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
      <Button onClick={() => setNewExpenseModal(true)} variant="contained" color="primary" endIcon={<AddCircleIcon />}>
        Add Expense
      </Button>
    <Box
      className={classes.tableContainer}
      >
        <AccountTable rows={rows}
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
