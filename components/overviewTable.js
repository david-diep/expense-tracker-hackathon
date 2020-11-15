import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import moment from 'moment'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {props.columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.rightAlign ? "right" : "left"}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
              {orderBy === column.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    minHeight: '70vh',
    maxHeight: '85vh',
  },
  [theme.breakpoints.up('md')]: {
    table: {
      minWidth: 750,
    }
  },
  table: {
    overflow: 'auto'
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 1,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

const getTableColumns = (mode) => {
  let columns;
  if (mode === "default" ||mode ==="date") {
    columns = [
      { id: 'date', label: "Date" },
      { id: 'account', label: "Account" },
      { id: 'expName', label: 'Name' },
      { id: 'description', label: 'Description' },
      { id: 'category', label: 'Category' },
      { id: 'amount', rightAlign: true, label: 'Amount' },
    ];
  } else if (mode === "category") {
    columns = [
      { id: 'date', label: "Date" },
      { id: 'account', label: "Account" },
      { id: 'expName', label: 'Name' },
      { id: 'description', label: 'Description' },
      { id: 'amount', rightAlign: true, label: 'Amount' },
    ];
  }
  return columns;
}

export default function OverviewTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


  const renderTableBody = () => {
    if (props.mode === "default" || props.mode === "date"){
      return (
      <TableBody>
        {stableSort(props.rows, getComparator(order, orderBy))
          .map((row, index) => {

            return (
              <TableRow
                hover
                tabIndex={-1}
                key={index}
              >
                <TableCell component="th" scope="row">
                  {moment(row.date).format('M/DD/YYYY')}
                </TableCell>
                <TableCell>{row.account}</TableCell>
                <TableCell >{row.expName}</TableCell>
                <TableCell >{row.description}</TableCell>
                <TableCell >{row.category}</TableCell>
                <TableCell align="right">{parseFloat(row.amount).toFixed(2)}</TableCell>

              </TableRow>
            );
          })}

      </TableBody>
        )
    } else if (props.mode ==="category"){
      return(
        <TableBody>
          {stableSort(props.rows, getComparator(order, orderBy))
            .map((row, index) => {

              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={index}
                >
                  <TableCell component="th" scope="row">
                    {moment(row.date).format('M/DD/YYYY')}
                  </TableCell>
                  <TableCell>{row.account}</TableCell>
                  <TableCell >{row.expName}</TableCell>
                  <TableCell >{row.description}</TableCell>
                  <TableCell align="right">{parseFloat(row.amount).toFixed(2)}</TableCell>

                </TableRow>
              );
            })}

        </TableBody>
      )
    }
  }


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >

            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
              columns={getTableColumns(props.mode)}
            />
            {renderTableBody()}
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
