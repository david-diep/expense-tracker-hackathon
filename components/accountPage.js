
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import {  useEffect } from 'react';
//import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AccountTable from '../components/accountTable';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Modal from '@material-ui/core/Modal';
import { useForm, Controller} from "react-hook-form";
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';

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
    margin:'13% auto',
    height:'40vh',
    width:'40vw',
    background: '#f5f5f5'
  },
  modalContainer: {
    display:'flex',
    flexDirection:'column',

  }
}));

export default function AccountPage(props){

  const classes = useStyles();

  const [editName, setEditName] = React.useState(false);
  const { register, handleSubmit, control } = useForm();
  const [title, setTitle] = React.useState(props.account.accName);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [] = React.useState()

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



  const editSubmit = (data) => {
    event.preventDefault();
    props.editAccountName(data.newAccName,props.account.id);
    setEditName(false);
    setTitle(data.newAccName)
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

        <form onSubmit={handleSubmit(editSubmit)} className={classes.title}>
          <Controller as={TextField} control={control} id='newAccName' name='newAccName' ref={register} style={{ fontSize: '2rem' }} defaultValue={props.account.accName} label="Account Name"/>
          {/* <TextField id='newAccName' name='newAccName' ref={register} style={{ fontSize: '2rem' }} defaultValue={props.account.accName} label="Account Name" /> */}
          {/* <input name='newAccName' ref={register} style={{fontSize:'2rem'}} defaultValue={props.account.accName} ></input> */}
          <Button type="submit" style={{ background:'#228B22', marginLeft:'5px'}}>Save</Button>
            <Button onClick={()=>setEditName(false)} type="reset" style={{ background: '#FF0000', marginLeft: '5px'}}>Cancel</Button>
          </form>
      )
    }
  }

  return (
  <Box className={classes.root}>
    <div className={classes.titleRow}>
      {renderTitle()}
      <div>
        <h2>Total: </h2>
      </div>
    </div>
      <Button onClick={() => setModalOpen(true)} variant="contained" color="primary" endIcon={<AddCircleIcon />}>
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
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
       <Paper className={classes.modal}>
          <Paper className={classes.modalContainer}>
            <form>
              <TextField id="standard-basic" label="Standard" />
              <TextField id="standard-basic" label="Standard" />
              <TextField id="standard-basic" label="Standard" />
              <Button type="submit" style={{ background: '#228B22', marginLeft: '5px' }}>Save</Button>
              <Button onClick={() => () => setModalOpen(false)} type="reset" style={{ background: '#FF0000', marginLeft: '5px' }}>Cancel</Button>
            </form>
         </Paper>
       </Paper>

    </Modal>

  </Box>
  )
}
