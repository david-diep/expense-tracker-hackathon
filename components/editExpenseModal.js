import Modal from '@material-ui/core/Modal';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import DayjsUtils from '@date-io/dayjs';
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
  formContainer: {

  }
}));

export default function editExpenseModal(props) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm()
  const [value, setValue] = React.useState(props.editFocus.amount);
  const [selectedDate, handleDateChange] = React.useState(new Date());

  const editExpenseSubmit = (data) => {
    props.editExpense(props.account.id, props.editFocus.expenseId, {
      expenseId: props.editFocus.expenseId,
      expName: data.expenseName,
      description: data.description,
      date: selectedDate,
      category: data.category,
      amount: value
    })
    handleDateChange(new Date());
    setValue(null);
    props.setEditFocus(null);
    props.setEditExpenseModal(false);
  }

  return (<>
    <Modal
      open={props.editExpenseModal}
      onClose={() => props.setEditExpenseModal(false)}
    >
      <Paper className={classes.modal}>

        <form className={classes.modalContainer} onSubmit={handleSubmit(editExpenseSubmit)}>
          <h2>Edit Expense</h2>

          <MuiPickersUtilsProvider utils={DayjsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/DD/YYYY"
              margin="normal"
              value={selectedDate}
              onChange={date => handleDateChange(date)}
              id="date-picker"
              label="Date"
              style={{ fontSize: '2rem' }}
            />
          </MuiPickersUtilsProvider>

          <TextField
            id='expenseName'
            name='expenseName'
            defaultValue={props.editFocus.expName}
            inputRef={register}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ fontSize: '2rem' }}
            label="Expense Name">
          </TextField>

          <TextField
            id='description'
            name='description'
            defaultValue={props.editFocus.description}
            ref={register}
            style={{ fontSize: '2rem' }}
            InputLabelProps={{
              shrink: true,
            }}
            label="Description"
          ></TextField>


          <TextField
            select
            inputRef={register}
            id='category'
            name='category'
            defaultValue={props.editFocus.category}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ fontSize: '1rem' }}
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
            onChange={(event, value) => setValue(value)}
            currencySymbol="$"

          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Button type="submit" style={{ background: '#228B22', marginLeft: '5px' }}>Edit</Button>
            <Button onClick={() => props.setEditExpenseModal(false)} type="reset" style={{ background: '#FF0000', marginLeft: '5px' }}>Cancel</Button>
          </div>
        </form>

      </Paper>
    </Modal>


  </>)
}
