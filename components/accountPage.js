import React from 'react'
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import AccountTable from '../components/accountTable';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useForm, Controller} from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { useEffect } from 'react';
import AddExpenseModal from './addExpenseModal'
import EditExpenseModal from './editExpenseModal'

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

}));

export default function AccountPage(props){

  const classes = useStyles();
  const [editName, setEditName] = React.useState(false);
  const { register, handleSubmit, control } = useForm();
  const [title, setTitle] = React.useState(props.account.accName);
  const [newExpenseModal, setNewExpenseModal] = React.useState(false);
  const [editFocus, setEditFocus] = React.useState(null);
  const [editExpenseModal, setEditExpenseModal] = React.useState(false);
  const [total, setTotal] = React.useState();

  const columns = [
    { id: 'date',  label: "Date" },
    { id: 'expName',  label: 'Name'},
    { id: 'description',  label: 'Description' },
    { id: 'category',  label: 'Category'},
    { id: 'amount', rightAlign: true, label: 'Amount' },
    { id: 'actions', label: 'Actions' },
  ];

  const rows = props.expenses.map((expense) => {
    return {
      expenseId: expense.expenseId,
      date: expense.date,
      expName: expense.expName,
      description: expense.description,
      category: props.categories[expense.category].id,
      amount: expense.amount,
    }
  })

  useEffect(()=>{
    calculateTotal();
    if(!editName){
      setTitle(props.getAccountName(props.account.id));
    }
  })

  const calculateTotal = () => {
    let total=0;
    for(let i=0;i< props.expenses.length;i++){
      total +=parseFloat(props.expenses[i].amount);
    }
    setTotal(total);
  }


  const editAccountSubmit = (data) => {
    props.editAccountName(data.newAccName,props.account.id);
    setEditName(false);
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

  const renderTitle = () => {
    if(!editName){
      return(
      <div className={classes.title} >
        <h1>{title} </h1>
        <IconButton onClick={() => setEditName(true)}><EditIcon /></IconButton>
      </div >
      )}
    else{
      return (

        <form onSubmit={handleSubmit(editAccountSubmit)} className={classes.title}>
          <Controller as={TextField} control={control}
            id='newAccName'
            name='newAccName'
            ref={register}
            style={{ fontSize: '2rem' }}
            defaultValue={props.account.accName}
            label="Account Name"/>
          <Button type="submit" style={{ background:'#228B22', marginLeft:'5px'}}>Save</Button>
          <Button onClick={() => { setEditName(false); }} type="reset" style={{ background: '#FF0000', marginLeft: '5px'}}>Cancel</Button>
          </form>
      )
    }
  }

  return (
  <Box className={classes.root}>
    <div className={classes.titleRow}>
      {renderTitle()}
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
        <AccountTable columns={columns} rows={rows}
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

  </Box>
  )
}
