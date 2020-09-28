import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  root: {
    width: '95%'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  tableContainer: {
    marginTop: '15px'
  },
  formControl: {

  }



}));

export default function HomePage(props) {
  const classes = useStyles();
  const [option, setOption] = React.useState("Default")
  const [secondary, setSecondary] = React.useState("Default")

  return(
    <Box className={classes.root}>
      <h1>Overview</h1>
      <div name="row-options">
        <div name="options">
          <FormControl className={classes.formControl}>
            <InputLabel id="overview-sort">View</InputLabel>
            <Select
              labelId="select-label"
              id="overview-sort"
              value={option}
              onChange={(event)=>setOption(event.target.value)}
            >
              <MenuItem value={'Default'}>Overview</MenuItem>
              <MenuItem value={'Category'}>Category</MenuItem>
              <MenuItem value={'Date'}>Date</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div name="total">

        </div>
      </div>

    </Box>
  )
}
