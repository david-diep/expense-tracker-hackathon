import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OverviewTable from '../components/overviewTable'

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
  const [category, setCategory] = React.useState("Food")
  const [total, setTotal] = React.useState();
  const [dateRange, setDateRange] = React.useState('day');
  const [date, setDate] = React.useState(new Date());

  React.useEffect(()=>{
    calculateTotal();
  })

  const calculateTotal = () =>{

    let totalCost = 0;

    if (mode === "default") {
      const accounts = Object.keys(props.expenses)
      const reducer = (accumulator, expense) => accumulator + parseFloat(expense.amount);

      for (const account of accounts) {
        totalCost+=props.expenses[account].reduce(reducer,0)
      }
      setTotal(totalCost)

    } else if (mode === 'category' ||mode === "Accounts"){
      const accounts = Object.keys(props.expenses)
      const reducer = (accumulator, expense) => {
        if(expense.category===secondary){
          return accumulator + parseFloat(expense.amount);
        } else{
          return accumulator;
        }
        };

      for (const account of accounts) {
        totalCost += props.expenses[account].reduce(reducer, 0)
      }
      setTotal(totalCost)
    }
}

  const getTableRows = () => {
    let rows = [];
    if (mode === "default") {
      const accounts = Object.keys(props.expenses)


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

      return rows;

    } else if (mode === 'category') {
      const accounts = Object.keys(props.expenses)

      for (const account of accounts) {
        rows = rows.concat(props.expenses[account].map((expense) => {
          if(expense.category===secondary){
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
      rows=rows.filter(expense=> expense!==undefined)
      return rows;

    } else if (mode ==='date'){
        if(dateRange==='month'){

        }else if (dateRange==='week'){

        }else{ //day

        }
    }
  }

  const renderSecondSelect = () =>{

    if(mode ==='category'){

      return(<>
        <InputLabel id="category-sort">Category</InputLabel>
        <Select
          value={secondary}
          onChange={(event) => setSecondary(event.target.value)}
        >

          <MenuItem value='Food'>Food</MenuItem>
          <MenuItem value='Entertainment'>Entertainment</MenuItem>
          <MenuItem value='Clothing'>Clothing</MenuItem>
          <MenuItem value='Bills'>Bills</MenuItem>
          <MenuItem value='Travel'>Travel</MenuItem>
          <MenuItem value='Other'>Other</MenuItem>

        </Select></>
      )
    }
    else if(mode ==='Date'){
      return(
        <InputLabel id="date-sort">Date Range</InputLabel>
        <Select
          value={secondary}
          onChange={(event) => setMode(event.target.value)}
        >
          <MenuItem value={'day'}>Day</MenuItem>
          <MenuItem value={'week'}>Week</MenuItem>
          <MenuItem value={'month'}>Month</MenuItem>
        </Select>
      )
    }
  }
  return(
    <Box className={classes.root}>
      <h1>Overview</h1>
      <div name="row-options" className={classes.titleRow}>
        <div name="options" style={{display:'flex', alignItems:'center'}}>
          <FormControl className={classes.formControl}>
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
              {/* <MenuItem value={'Date'}>Date</MenuItem> */}
            </Select>

          </FormControl>
          <FormControl className={classes.formControl} style={{marginLeft:'5px'}}>

            {renderSecondSelect()}
          </FormControl>
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
