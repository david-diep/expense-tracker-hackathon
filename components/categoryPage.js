import React from 'react'
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from "@material-ui/core/Paper";
import Modal from '@material-ui/core/Modal';
import { Category } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.up('sm')]: {
    root: {
      width: '75%'
    },
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      width: '90%',
      paddingTop: '30px'
    }
  }
  ,
  title: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '20px'
    }
  },
  tableContainer: {
    marginTop: '15px',

  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },
  modal: {
    margin: '10% auto',
    height: '30vh',
    width: '30vw',
    background: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center'
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '30px'
  },
  bigFont: {
    fontSize: '1.2rem'
  }

}));

export default function CategoryPage(props) {

  const classes = useStyles();
  const [categoryModal, setCategoryModal] = React.useState(false);
  const [modalMode, setModalMode] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState('')
  const [editFocusId, setEditFocusId] = React.useState()

  const rows = Object.keys(props.categories).map((categoryId) => {
    return {
      id: categoryId,
      name: props.categories[categoryId].name
    }
  })

  const handleAddSubmit = () => {
    setCategoryModal(false)
    props.addCategory(categoryName);
    setCategoryName('');
  }

  const renderAddModal = () => {
    if(modalMode ==='add'){
      return(
        <Modal
        open={categoryModal}
        onClose={()=>setCategoryModal(false)}>
          <Paper className={classes.modal}>
            <form className={classes.modalContainer} onSubmit={handleAddSubmit}>
              <h2>Add Category</h2>
              <TextField
                id='categoryName'
                name='categoryName'
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

                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}

                label="Category Name"></TextField>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <Button type="submit" style={{ background: '#228B22', marginLeft: '5px' }}>Add</Button>
                <Button onClick={() => setCategoryModal(false)} type="reset" style={{ background: '#FF0000', marginLeft: '5px' }}>Cancel</Button>
              </div>
            </form>
          </Paper>
        </Modal>
      )
    }
  }

  const openEditModal = (name, id) => {
    setEditFocusId(id);
    setCategoryName(name);
    setModalMode('edit');
    setCategoryModal(true);
  }

  const handleEditSubmit = () => {
    props.editCategory(categoryName,editFocusId)
    setCategoryModal(false)
    setCategoryName('');
  }

  const renderEditModal = () => {
    if (modalMode === 'edit') {
      return (
        <Modal
          open={categoryModal}
          onClose={() => setCategoryModal(false)}>
          <Paper className={classes.modal}>
            <form className={classes.modalContainer} onSubmit={handleEditSubmit}>
              <h2>Edit Category Name</h2>
              <TextField
                id='categoryName'
                name='categoryName'
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
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}

                label="Category Name"></TextField>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <Button type="submit" style={{ background: '#228B22', marginLeft: '5px' }}>Edit</Button>
                <Button onClick={() => setCategoryModal(false)} type="reset" style={{ background: '#FF0000', marginLeft: '5px' }}>Cancel</Button>
              </div>
            </form>
          </Paper>
        </Modal>
      )
    }
  }

  return (
    <Box className={classes.root}>
      <div className={classes.titleRow}>
        <h1>Manage Categories</h1>
      </div>

      <Button onClick={() => {setCategoryModal(true); setModalMode('add')}} variant="contained" color="primary" endIcon={<AddCircleIcon />}>
        Add Category
      </Button>
      <Box
        className={classes.tableContainer}
      >
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="category table">
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => openEditModal(row.name,row.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => props.deleteCategory(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {renderAddModal()}
      {renderEditModal()}

    </Box>
  )
}
