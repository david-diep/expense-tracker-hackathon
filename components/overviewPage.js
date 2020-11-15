import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OverviewTable from '../components/overviewTable'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({

    [theme.breakpoints.up('sm')]: {
      root:{
        width: '90%'
      },
      titleRow:{
        flexWrap: 'nowrap',
      }
    },
    [theme.breakpoints.down('sm')]:{
      root: {
        width: '98%',
        paddingTop:'30px'
      }
    }
  ,
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tableContainer: {
    marginTop: '15px'
  },
  formControl:{
    fontSize:'3rem'
  },
  bigFont: {
    fontSize: '1.2rem'
  }

}));

export default function OverviewPage(props) {
  const classes = useStyles();
  const [mode, setMode] = React.useState("default")
  const [category, setCategory] = React.useState("")
  const [total, setTotal] = React.useState();
  const [dateRange, setDateRange] = React.useState('day');
  const [date, setDate] = React.useState(new moment());

  React.useEffect(()=>{
    calculateTotal();
  })

  const calculateTotal = () =>{
    const accounts = Object.keys(props.expenses)
    let totalCost = 0;

    if (mode === "default" || mode === 'category' && category==="") {

      const reducer = (accumulator, expense) => accumulator + parseFloat(expense.amount);

      for (const account of accounts) {
        totalCost+=props.expenses[account].reduce(reducer,0)
      }

    } else if (mode === 'category' ){

      const reducer = (accumulator, expense) => {
      if(expense.category===category){
        return accumulator + parseFloat(expense.amount);
      } else{
        return accumulator;
      }
    };

      for (const account of accounts) {
        totalCost += props.expenses[account].reduce(reducer, 0)
      }

    }
      else if (mode ==='date'){
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

        for (const account of accounts) {
          totalCost += props.expenses[account].reduce(reducer, 0)
        }
      }

    setTotal(totalCost);
    }



  //also calculates the total for all rows returned
  const getTableRows = () => {
    let rows = [];
    const accounts = Object.keys(props.expenses)

    if (mode === "default" || mode === 'category' && category === "") {

      for (const account of accounts) {

        rows = rows.concat(props.expenses[account].map((expense) => {
          return {
            account: props.accounts[account].accName,
            id: expense.expenseId,
            date: expense.date,
            expName: expense.expName,
            description: expense.description,
            category: props.categories[expense.category] === undefined ? "Deleted" : props.categories[expense.category].name,
            amount: expense.amount
          }
        }))
      }

    } else if (mode === 'category') {

      for (const account of accounts) {
        rows = rows.concat(props.expenses[account].map((expense) => {
          if(expense.category===category){
            return {
              account: props.accounts[account].accName,
              id: expense.expenseId,
              date: expense.date,
              expName: expense.expName,
              description: expense.description,
              amount: expense.amount
            }
        }
        }))
      }

    }
    else if (mode ==='date'){
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

      for (const account of accounts) {

        rows = rows.concat(props.expenses[account].map((expense) => {
          if (moment(expense.date).isSameOrAfter(startDate) && moment(endDate).isSameOrAfter(expense.date)) {
            return {
              account: props.accounts[account].accName,
              id: expense.expenseId,
              date: expense.date,
              expName: expense.expName,
              description: expense.description,
              category: props.categories[expense.category] === undefined? "Deleted" : props.categories[expense.category].name,
              amount: expense.amount
            }
          }
        }))
      }

    }
    rows = rows.filter(expense => expense !== undefined)
    return rows;
  }

  const renderSecondSelect = () =>{

    if(mode ==='category'){

      return(
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
            {Object.keys(props.categories).map((categoryId)=>{
              return <MenuItem key={categoryId} value={props.categories[categoryId].id}>{props.categories[categoryId].name}</MenuItem>
            })}


            </Select>
        </FormControl>
      )
    }
    else if(mode ==='date'){
      let dateSelector;
      if(dateRange==='month'){
        dateSelector = (
          <DatePicker
            // variant="inline"
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
      }else{
        dateSelector = (
        <KeyboardDatePicker
          clearable
          // variant="inline"
          format="MM/DD/YYYY"

          value={date}
          onChange={date => setDate(date)}
          id="date-picker"
          label={dateRange==='week'? "Week Starting Date" : 'Date'}
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
      return(
        <>
          <FormControl className={classes.formControl} style={{ marginLeft: '10px',minWidth:"120px" }}>

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

  return(
    <Box className={classes.root}>
      <h1>Overview</h1>
      <div name="row-options" className={classes.titleRow}>
        <div name="options" >
          <FormControl>

          </FormControl>
          <FormControl className={classes.formControl} style={{ minWidth: "80px" }}>
            <InputLabel id="overview-sort" className={classes.bigFont}>View</InputLabel>
            <Select
              className={classes.bigFont}
              labelId="select-label"
              id="overview-sort"
              value={mode}
              onChange={(event)=>setMode(event.target.value)
              }
            >
              <MenuItem value={'default'}>All</MenuItem>
              <MenuItem value={'category'}>Category</MenuItem>
              <MenuItem value={'date'}>Date</MenuItem>
            </Select>

          </FormControl>

          {renderSecondSelect()}

        </div>

        <div name="total">
          {Boolean(total) && <h2>Total: ${total.toFixed(2)}</h2>}
        </div>
      </div>
      <Box className={classes.tableContainer}>
        <OverviewTable
          categories={props.categories}
          rows={getTableRows()}
          mode={mode}
        />
      </Box>
    </Box>
  )
}
