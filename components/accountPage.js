import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import AccountTable from '../components/accountTable';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Modal from '@material-ui/core/Modal';
import { useForm, Controller} from "react-hook-form";
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import MomentUtils from '@date-io/moment';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const useStyles = makeStyles(() => ({
  root:{
    width:'95%'
  },
  title:{
    display: 'flex',
    alignItems: 'center',
  },
  tableContainer:{
    marginTop:'15px'
  },
  titleRow: {
    display:'flex',
    justifyContent:'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center'
  },
  modal: {
    margin:'10% auto',
    height:'50vh',
    width:'30vw',
    background: '#f5f5f5',
    display:'flex',
    justifyContent:'center'
  },
  modalContainer: {
    display:'flex',
    flexDirection:'column',
    width:'70%',
    paddingTop:'30px'
  },
  formContinaer: {

  }
}));

export default function AccountPage(props){

  const classes = useStyles();

  const [editName, setEditName] = React.useState(false);
  const { register, handleSubmit, control } = useForm();
  const [title, setTitle] = React.useState(props.account.accName);
  const [newExpenseModal, setNewExpenseModal] = React.useState(false);
  const [editExpenseModal, editNewExpenseModal] = React.useState(false);
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const [value, setValue] = React.useState();

  const columns = [
    { id: 'date',  label: "Date" },
    { id: 'name',  label: 'Name'},
    { id: 'description',  label: 'Description' },
    { id: 'category',  label: 'Category'},
    { id: 'amount', rightAlign: true, label: 'Amount' },
    { id: 'actions', label: 'Actions' },
  ];

  const rows = props.expenses.map((expense) => {
    return {
      id: expense.expenseId,
      date: expense.date,
      name: expense.expName,
      description: expense.description,
      category: expense.category,
      amount: expense.amount,
    }
  })


  const editAccountSubmit = (data) => {
    props.editAccountName(data.newAccName,props.account.id);
    setEditName(false);
    setTitle(data.newAccName)
  }

  const newExpenseSubmit = (data) => {
    console.log("data:",data)
    console.log('accid', props.account.id)
    props.addExpense(props.account.id,{
      expName: data.expenseName,
      description: data.description,
      date: selectedDate,
      category: data.category,
      amount: value })
    setValue(null);
  }
// { expName: "Lunch", date: "9/24", description: "McDonalds", amount: 6.00 }
  // const generateRows = () => {
  //   const rows = props.account.expenses.map((expense) => {
  //     return {
  //       id: expense.expenseId,
  //       date: expense.date,
  //       expense: expense.expName,
  //       description: expense.description,
  //       amount: expense.amount
  //     }
  //   })
  //   return rows;
  // }



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
            <Button onClick={()=>setEditName(false)} type="reset" style={{ background: '#FF0000', marginLeft: '5px'}}>Cancel</Button>
          </form>
      )
    }
  }

  const renderModal = () => {

  }

  return (
  <Box className={classes.root}>
    <div className={classes.titleRow}>
      {renderTitle()}
      <div>
        <h2>Total: </h2>
      </div>
    </div>
      <Button onClick={() => setNewExpenseModal(true)} variant="contained" color="primary" endIcon={<AddCircleIcon />}>
        Add Expense
      </Button>
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      className={classes.tableContainer}
      >
        <AccountTable columns={columns} rows={rows}/>
    </Box>
      <Modal
        open={newExpenseModal}
        onClose={() => setNewExpenseModal(false)}
      >
       <Paper className={classes.modal}>

            <form className={classes.modalContainer} onSubmit={handleSubmit(newExpenseSubmit)}>
              <h2>Add New Expense</h2>

              <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/DD/yyyy"
                      margin="normal"
                      value={selectedDate}
                      onChange={date => handleDateChange(date)}
                      id="date-picker"
                      label="Date"
                      style={{ fontSize: '2rem' }}
                    />
              </MuiPickersUtilsProvider>



              <Controller as={TextField} control={control}
                id='expenseName'
                name='expenseName'
                ref={register}
                InputLabelProps={{
                shrink: true,
              }}
                style={{ fontSize: '2rem' }}

                label="Expense Name" />
              <Controller as={TextField} control={control}
                id='description'
                name='description'
                ref={register}
                style={{ fontSize: '2rem' }}
                InputLabelProps={{
                  shrink: true,
                }}
                label="Description" />
            <Controller as={
              <TextField>
                <MenuItem value='Food'>Food</MenuItem>
                <MenuItem value='Entertainment'>Entertainment</MenuItem>
                <MenuItem value='Clothing'>Clothing</MenuItem>
                <MenuItem value='Bills'>Bills</MenuItem>
                <MenuItem value='Travel'>Travel</MenuItem>
                <MenuItem value='Other'>Other</MenuItem>
              </TextField>}
            control={control}
            select
              id='category'
              name='category'
              ref={register}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ fontSize: '1rem' }}

              label="Category" />


            <CurrencyTextField
              label="Amount"
              variant="standard"
              value={value}
              decimalCharacter="."
              digitGroupSeparator=","
              onChange={(event, value) => setValue(value)}
              unselectable
              currencySymbol="$"

            />
              <div style={{display:'flex',justifyContent:'flex-end', marginTop:'10px'}}>
                <Button type="submit" style={{ background: '#228B22', marginLeft: '5px' }}>Add</Button>
                <Button onClick={() => setNewExpenseModal(false)} type="reset" style={{ background: '#FF0000', marginLeft: '5px' }}>Cancel</Button>
              </div>
            </form>

       </Paper>
    </Modal>

  </Box>
  )
}
