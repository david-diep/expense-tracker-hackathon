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
import moment from '@date-io/moment'

const useStyles = makeStyles(() => ({
  root: {
    width: '95%'
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center'
  },
  tableContainer: {
    marginTop: '15px'
  },
  formControl:{
    fontSize:'3rem'
  }

}));

export default function OverviewPage(props) {
  const classes = useStyles();
  const [mode, setMode] = React.useState("default")
  const [category, setCategory] = React.useState("")
  const [total, setTotal] = React.useState();
  const [dateRange, setDateRange] = React.useState('day');
  const [date, setDate] = React.useState(new Date());

  React.useEffect(()=>{
    calculateTotal();
  })

  const calculateTotal = () =>{
    const accounts = Object.keys(props.expenses)
    let totalCost = 0;

    if (mode === "default" || mode === 'category' && category==="") {
      const accounts = Object.keys(props.expenses)
      const reducer = (accumulator, expense) => accumulator + parseFloat(expense.amount);

      for (const account of accounts) {
        totalCost+=props.expenses[account].reduce(reducer,0)
      }

    } else if (mode === 'category' ){
      const accounts = Object.keys(props.expenses)
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
      else if (mode ==='date '){
        let endDate;
      console.log("date", date)
      console.log("endDate", endDate)
        if (dateRange === 'month') {
          const tempMoment = moment(date).add(1, "months")
          endDate = new Date(tempMoment.format('l'))
        } else if (dateRange === 'week') {
          const tempMoment = moment(date).add(1, "weeks")
          endDate = new Date(tempMoment.format('l'))
        } else { //dateRange === 'day'
          const tempMoment = moment(date).add(1, "day")
          endDate = new Date(tempMoment.format('l'))
        }

        const reducer = (accumulator, expense) => {
          if (date <= expense.date <= endDate) {
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

    if (mode === "default" || mode === 'category' && category === ""|| mode ==='date' ) {

      for (const account of accounts) {

        rows = rows.concat(props.expenses[account].map((expense) => {
          return {
            account: props.accounts[account].accName,
            id: expense.expenseId,
            date: expense.date,
            expName: expense.expName,
            description: expense.description,
            category: expense.category,
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
      rows = rows.filter(expense => expense !== undefined)

    }
    else if (mode ==='date'){
      let endDate;

      if (dateRange === 'month') {
        const tempMoment = moment(date).add(1, "months")
        endDate = new Date(tempMoment.format('l'))
      } else if (dateRange === 'week') {
        const tempMoment = moment(date).add(1, "weeks")
        endDate = new Date(tempMoment.format('l'))
      } else { //dateRange === 'day'
        const tempMoment = moment(date).add(1, "day")
        endDate = new Date(tempMoment.format('l'))
      }
      console.log("date",date)
      console.log("endDate",endDate)
      for (const account of accounts) {
        rows = rows.concat(props.expenses[account].map((expense) => {
          if (date <= expense.date <= endDate) {
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
        rows = rows.filter(expense => expense !== undefined)
    }

    return rows;
  }

  const renderSecondSelect = () =>{

    if(mode ==='category'){

      return(
        <FormControl className={classes.formControl} style={{ marginLeft: '10px', minWidth: "120px" }}>
          <InputLabel id="select-category">Category</InputLabel>
          <Select

            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value='Food'>Food</MenuItem>
            <MenuItem value='Entertainment'>Entertainment</MenuItem>
            <MenuItem value='Clothing'>Clothing</MenuItem>
            <MenuItem value='Bills'>Bills</MenuItem>
            <MenuItem value='Travel'>Travel</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>

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
        />)
      }
      return(
        <>
          <FormControl className={classes.formControl} style={{ marginLeft: '10px',minWidth:"120px" }}>

            <InputLabel id="date-sort" style={{ minWidth: "60px" }}>Date Range</InputLabel>
            <Select
              value={dateRange}
              onChange={(event) => setDateRange(event.target.value)}
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
        <div name="options" style={{display:'flex', alignItems:'center'}}>
          <FormControl className={classes.formControl} style={{ minWidth: "80px" }}>
            <InputLabel id="overview-sort">View</InputLabel>
            <Select
              labelId="select-label"
              id="overview-sort"
              value={mode}
              onChange={(event)=>setMode(event.target.value)
              }
            >
              <MenuItem value={'default'}>Total</MenuItem>
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
      <Box style={{marginTop:'15px'}}>
        <OverviewTable
          // columns={getTableColumns()}
          rows={getTableRows()}
          mode={mode}
        />
      </Box>
    </Box>
  )
}
