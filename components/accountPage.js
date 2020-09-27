
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
//import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AccountTable from '../components/accountTable';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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
  }
}));

export default function AccountPage(props){
  const classes = useStyles();

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


  return (
  <Box className={classes.root}>
      <div className={classes.title}>
        <h1>{props.account.accName} </h1>
        <IconButton><EditIcon /></IconButton>
      </div>

      <Button variant="contained" color="primary" endIcon={<AddCircleIcon />}>
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


  </Box>
  )
}
