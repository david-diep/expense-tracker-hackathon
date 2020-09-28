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
    display:'flex',
    flexWrap:'nowrap'
  }

}));

export default function HomePage(props) {
  const classes = useStyles();
  const [mode, setMode] = React.useState("Default")
  const [secondary, setSecondary] = React.useState("Food")
  const [total, setTotal] = React.useState();

  React.useEffect(()=>{
    calculateTotal();
  })

  const getTableColumns = () => {
    if (mode === "Default") {
      const columns = [
        { id: 'date', label: "Date" },
        { id: 'account', label: "Account" },
        { id: 'expName', label: 'Name' },
        { id: 'description', label: 'Description' },
        { id: 'category', label: 'Category' },
        { id: 'amount', rightAlign: true, label: 'Amount' },
      ];
      return columns;
    } else if (mode ==="Category"){
      const columns =[
        { id: 'date', label: "Date" },
        { id: 'account', label: "Account" },
        { id: 'expName', label: 'Name' },
        { id: 'description', label: 'Description' },
        { id: 'amount', rightAlign: true, label: 'Amount' },
      ];
      return columns;
    }
  }

  const calculateTotal = () =>{

    let totalCost = 0;

    if (mode === "Default") {
      const accounts = Object.keys(props.expenses)
      const reducer = (accumulator, expense) => accumulator + expense.amount;

      for (const account of accounts) {
        totalCost+=props.expenses[account].reduce(reducer,0)
      }
      setTotal(totalCost)

    } else if (mode === 'Category'){
      const accounts = Object.keys(props.expenses)
      const reducer = (accumulator, expense) => {
        if(expense.category===secondary){
          return accumulator + expense.amount;
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
    if (mode === "Default") {
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
    } else if (mode === 'Category') {
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

    }
  }

  const renderSecondSelect = () =>{

    if(mode ==='Category'){

      return(<>
        <InputLabel id="overview-sort">Category</InputLabel>
        <Select
          labelId="select-label-2"
          id="overview-sort-2"
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
    // else if(mode ==='Date'){
    //   return(
    //     <Select
    //       labelId="select-label-2"
    //       id="overview-sort-2"
    //       value={secondary}
    //       onChange={(event) => setMode(event.target.value)}
    //     >
    //       <MenuItem value={'Default'}>Total</MenuItem>
    //       <MenuItem value={'Category'}>Category</MenuItem>
    //       <MenuItem value={'Date'}>Date</MenuItem>
    //     </Select>
    //   )
    // }
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
              onChange={(event)=>setMode(event.target.value)}
            >
              <MenuItem value={'Default'}>Total</MenuItem>
              <MenuItem value={'Category'}>Category</MenuItem>
              {/* <MenuItem value={'Date'}>Date</MenuItem> */}
            </Select>

          </FormControl>
          <FormControl>

            {renderSecondSelect()}
          </FormControl>
        </div>
        <div name="total">
          {Boolean(total) && <h2>Total: ${total.toFixed(2)}</h2>}
        </div>
      </div>
      <Box style={{marginTop:'15px'}}>
        <OverviewTable
          columns={getTableColumns()}
          rows={getTableRows()}
          mode={mode}
        />
      </Box>
    </Box>
  )
}
