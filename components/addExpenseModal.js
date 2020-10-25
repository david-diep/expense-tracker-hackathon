import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import  DayjsUtils from '@date-io/dayjs';
import dayjs from 'dayjs'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  root: {
    width: '95%'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  tableContainer: {
    marginTop: '15px',

  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center'
  },
  modal: {
    margin: '10% auto',
    height: '50vh',
    width: '30vw',
    background: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center'
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    paddingTop: '30px'
  },
  modalItem: {
    marginTop:'5px',
  },
  smallFont:{
    fontSize: '.8rem'
  },
  bigFont:{
    fontSize: '1.2rem'
  }
}));

export default function addExpenseModal(props){
  const classes = useStyles();
  const [expenseName, setExpenseName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [category, setCategory] = React.useState()
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const [value, setValue] = React.useState();

  const newExpenseSubmit = () => {
    props.addExpense(props.account.id, {
      expName: expenseName,
      description: description,
      date: dayjs(selectedDate).format('MM/DD/YYYY'),
      category: category,
      amount: parseFloat(value).toFixed(2)
    })
    setValue(null);
    props.setNewExpenseModal(false);
    handleDateChange(new Date());
    setValue(null);
  }

  return (
    <Modal
      open={props.newExpenseModal}
      onClose={() => props.setNewExpenseModal(false)}
    >
      <Paper className={classes.modal}>

        <form className={classes.modalContainer} onSubmit={newExpenseSubmit}>
          <h2>Add New Expense</h2>

          <MuiPickersUtilsProvider utils={DayjsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/DD/YYYY"
              margin="normal"
              value={selectedDate}
              onChange={handleDateChange}
              id="date-picker"
              label="Date"
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
          </MuiPickersUtilsProvider>

          <TextField
            id='expenseName'
            name='expenseName'
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
            value={expenseName}
            onChange={(event)=>setExpenseName(event.target.value)}

            label="Expense Name">
          </TextField>

          <TextField
            id='description'
            name='description'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className={classes.modalItem}
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
            label="Description"
          ></TextField>


          <TextField
            select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            id='category'
            name='category'
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
            className={classes.modalItem}

            label="Category">
            <MenuItem value='Food'>Food</MenuItem>
            <MenuItem value='Entertainment'>Entertainment</MenuItem>
            <MenuItem value='Clothing'>Clothing</MenuItem>
            <MenuItem value='Bills'>Bills</MenuItem>
            <MenuItem value='Travel'>Travel</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
          </TextField>

          <CurrencyTextField
            label="Amount"
            variant="standard"
            value={value}
            decimalCharacter="."
            digitGroupSeparator=","
            onChange={(event,value) => setValue(value)}
            modifyValueOnWheel={false}
            currencySymbol="$"
            className={`${classes.modalItem}`}
            InputProps={{
              classes: {
                input: classes.bigFont,
              },
            }}
            InputLabelProps={{
              classes: {
                root: classes.bigFont,
              },

            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Button type="submit" style={{ background: '#228B22', marginLeft: '5px' }}>Add</Button>
            <Button onClick={() => { props.setNewExpenseModal(false); }} type="reset" style={{ background: '#FF0000', marginLeft: '5px' }}>Cancel</Button>
          </div>
        </form>

      </Paper>
    </Modal>
  )
}
