import React from 'react'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import MomentUtils from '@date-io/moment';
import moment from 'moment';

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.down('sm')]: {
      height: '80vh',
      width: '80vw',
    },
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
    marginTop: '5px',
  },
  smallFont: {
    fontSize: '.8rem'
  },
  bigFont: {
    fontSize: '1.2rem'
  }
}));

export default function EditExpenseModal(props) {
  const classes = useStyles();
  const [expenseName, setExpenseName] = React.useState(props.editFocus.expName)
  const [description, setDescription] = React.useState(props.editFocus.description)
  const [category, setCategory] = React.useState(props.editFocus.category)
  const [selectedDate, handleDateChange] = React.useState(props.editFocus.date);
  const [value, setValue] = React.useState(props.editFocus.amount);
  const editExpenseSubmit = () => {
    props.editExpense(props.account.id, props.editFocus.expenseId, {
      expenseId: props.editFocus.expenseId,
      expName: expenseName,
      description: description,
      date: new Date(moment(selectedDate).format('MM/DD/YYYY')),
      category: category,
      amount: parseFloat(value).toFixed(2)
    })
    setValue(null);
    props.setEditFocus(null);
    props.setEditExpenseModal(false);
  }
  return (
    <Modal
      open={props.editExpenseModal}
      onClose={() => props.setEditExpenseModal(false)}
    >
      <Paper className={classes.modal}>

        <form className={classes.modalContainer} onSubmit={editExpenseSubmit}>
          <h2>Edit Expense</h2>

          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              required
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
            required
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
            onChange={(event) => setExpenseName(event.target.value)}

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
            required
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
            {Object.keys(props.categories).map((categoryId) => {
              return <MenuItem key={categoryId} value={props.categories[categoryId].id}>{props.categories[categoryId].name}</MenuItem>
            })}
          </TextField>

          <CurrencyTextField
            label="Amount"
            variant="standard"
            value={value}
            decimalCharacter="."
            digitGroupSeparator=","
            onChange={(event, value) => setValue(value)}
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
            <Button type="submit" style={{ background: '#228B22', marginLeft: '5px' }}>Edit</Button>
            <Button onClick={() => { props.setEditExpenseModal(false); }} type="reset" style={{ background: '#FF0000', marginLeft: '5px' }}>Cancel</Button>
          </div>
        </form>

      </Paper>
    </Modal>
  )
}
