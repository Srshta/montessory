import React, { useState } from "react";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem,
    TableRow, Table,
    TableHead,
    TableBody,
    TableCell
} from "@material-ui/core";
import AddClassService from "./Locality/Service/addClassService";
import * as Yup from 'yup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { Grid, Card, Box, Select, TextField } from "@material-ui/core";
import { useFormik } from 'formik';
import { useContext, useEffect } from 'react';
import { useTheme } from "@material-ui/styles";
import {
    ResponsiveContainer,
    ComposedChart,
    AreaChart,
    LineChart,
    Line,
    Area,
    PieChart,
    Pie,
    Cell,
    YAxis,
    XAxis,
} from "recharts";
import mock from "./mock";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import BigStat from "./components/BigStat/BigStat";
import { withStyles, makeStyles } from '@material-ui/core/styles';
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#30875b",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));
export default function AddClass() {
    const tableHeaders = [ 'Class Name', 'Status', 'edit', 'delete'];
    const classes = useStyles();
    const [addClassList, setAddClassList] = useState([]);
    const [age, setAge] = React.useState('');
    var [error, setError] = useState(null);
    const [classList, setClassList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [addClass, setAddClass] = useState({
        className: '',
        status: '',
    });
    useEffect(() => {
        getAddClassList();
        return () => {
            setClassList([]);
            setAddClassList([])
        }
    }, []);
    const handleOpen = () => {
        setOpen(true);
    };
    const onclick = () => {

        setOpen(true);
      }
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const getAddClassList = () => {
      const userDetails = JSON.parse(localStorage.getItem("userDetail"));
      
        AddClassService.getAllAddClass(userDetails.schoolId).then((res) => {
            setAddClassList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const onSubmit = data => {
        console.log(JSON.stringify(data, null, 2));
      };
    const validationSchema = Yup.object().shape({
     
        className: Yup.string().required('Class Name is required'),
        status: Yup.string().required('status  is required'),
    });
   
    const editSchooleId = (schooleid) => {
        setAddClass(schooleid)
        handleOpen()
      }
      const deleteSchooleId = (schooleiddelete) => {
        if (schooleiddelete) {
          AddClassService.deleteAddClass(schooleiddelete).then((res) => {
            getAddClassList();
          }).catch((err) => {
          });
        }
      };
    const formik = useFormik({
        initialValues: addClass,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            const userDetails = JSON.parse(localStorage.getItem("userDetail"));
            values.schooleId = userDetails.schoolId;
            if(addClass._id){

              
                AddClassService.upadeAddClass(values).then((res) => {
                    handleClose();
                    getAddClassList();
                    resetForm()
                    alert("Class Updated Successfully.");
                    
                  }).catch((err) => {
                   
                  });
            }
            else {
                    AddClassService.creteAddClass(values).then((res) => {
                        getAddClassList();
                        handleClose();
                        resetForm();
                        alert(" Class Added Successfully.");
                        // props.history.push('/app/vendor');
                    })
                
                .catch((err) => {
                    
                    alert(err.response.data.message)
                })
        }
    },
    });
    return (
        <>
            <PageTitle title="Age" button={<Button
                variant="contained" onClick={handleOpen}
                size="medium"
                color="secondary" style={{backgroundColor:'#30875b'}}> Add Age
            </Button>} />
            <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table className="mb-0">
              <TableHead >
                <TableRow>
                  {tableHeaders.map(key => (
                    <StyledTableCell key={key}>{key}</StyledTableCell>
                  ))}
                </TableRow>

              </TableHead>
              <TableBody>
                {addClassList.map((schooleId) => (
                  <TableRow key={schooleId._id}>
        
                    <TableCell className="pl-3 fw-normal" >{schooleId.className}</TableCell>

                    <TableCell>
                      {schooleId.status ? 'Active' : 'In Active'}
                    </TableCell>
                    <TableCell>
                      <EditIcon style={{ cursor: 'pointer' }} onClick={() => editSchooleId(schooleId)} >
                      </EditIcon >
                    </TableCell>
                    <TableCell>
                      <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteSchooleId(schooleId)} />
                    </TableCell>
                    {/* <TableCell>
      <EditIcon   onClick={() => editVendor(category._id)} >
      
      </EditIcon >
    </TableCell> */}
                    {/* <TableCell>
      <DeleteIcon onClick={() => deleteVendorRister(vendorRegistration)} />
    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Widget>
        </Grid>
      </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Age</DialogTitle>
                <form onSubmit={formik.handleSubmit} >
                    <DialogContent style= {{ width: 308 }}>
                        
                        <TextField
                            InputProps={{ style: { width: 258 } }}
                            autoFocus
                            margin="dense"
                            id="className"
                            name="className"
                            label="Age"
                            type="text"
                            variant="standard"
                            value={formik.values.className}
                            onChange={formik.handleChange}
                            error={formik.touched.className && Boolean(formik.errors.className)}
                            helperText={formik.touched.className && formik.errors.className}
                        />
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="status"
                                name="status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                error={formik.touched.status && Boolean(formik.errors.status)}
                                helperText={formik.touched.status && formik.errors.status}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={true}>Active</MenuItem>
                                <MenuItem value={false}>In Active</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}


