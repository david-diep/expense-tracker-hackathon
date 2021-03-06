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
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from "@material-ui/core/Paper";
import moment from 'moment'
import Chip from './chip'

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

  },
  [theme.breakpoints.up('md')]: {
  table: {
    minWidth: 750,
  },
  paper: {
    minHeight: '65vh',
  }
},
  table: {
    overflowY: 'auto'
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

export default function AccountTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const columns = [
    { id: 'date', label: "Date" },
    { id: 'expName', label: 'Name' },
    { id: 'description', label: 'Description' },
    { id: 'category', label: 'Category' },
    { id: 'amount', rightAlign: true, label: 'Amount' },
    { id: 'actions', label: 'Actions' },
  ];

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <colgroup>
              <col style={{ width: '15%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '25%' }} />
            </colgroup>
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
              columns={columns}
            />
            <TableBody>
              {stableSort(props.rows, getComparator(order, orderBy))
                .map((row) => {
                  const labelId = `table-${row.expenseId}`;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.expenseId}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {moment(row.date).format('M/DD/YYYY')}
                      </TableCell>
                      <TableCell >{row.expName}</TableCell>
                      <TableCell >{row.description}</TableCell>
                      <TableCell >{props.categories[row.category] === undefined ? "Deleted" : <Chip text={props.categories[row.category].name} backgroundColor={props.categories[row.category].color} />}</TableCell>
                      <TableCell align="right">{parseFloat(row.amount).toFixed(2)}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => props.handleEditExpense(row)}>
                          <EditIcon/>
                        </IconButton>
                        <IconButton onClick={()=>props.deleteExpense(props.accountId,row.expenseId)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
