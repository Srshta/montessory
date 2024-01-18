import React, { useState } from "react";

import {
    LinearProgress,
    OutlinedInput,
} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem,
    TableRow, Table,
    TableHead,
    TableBody,
    TableCell
} from "@material-ui/core";
import TablePagination from '@material-ui/core/TablePagination';
import AddIcon from '@material-ui/icons/Add';
import StudentService from "./Locality/Service/studentService"
import SpecialObservationService from "./Locality/Service/specialObservationService"
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
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
import AddClassService from "./Locality/Service/addClassService";
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
export default function Teacher() {
    const tableHeaders = ['Student Name','Date', 'Special Observation', 'Edit', 'Delete', 'Add More'];
    const classes = useStyles();
    const [teacherList, setTeacherList] = useState([]);
    const [classNameList, setClassNameList] = useState([]);
    const [addClassList, setAddClassList] = useState([]);
    const [age, setAge] = React.useState('');
    const [studentList, setStudentList] = useState([]);
    var [error, setError] = useState(null);
    const [teacherIdList, setTeacherIdList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);
    const [specialObservationList, setSpecialObservationList] = useState([]);
    const [observation, setObservation] = useState({
        studentId: '',
        date: '',
        specialObservation: '',
    })
    const validationSchema = Yup.object().shape({
        // classId: Yup.string().required('Class Name is required'),
        studentId: Yup.string().required('Student Name is required'),
        date: Yup.string().required('Date is required'),
        specialObservation: Yup.string(),
       
    });
    useEffect(() => {
        getStudentList();
        getSpecialObservationList();
        return () => {
            setTeacherIdList([]);
            setTeacherList([]);
            setAddClassList([]);
            setStudentList([]);
            setSpecialObservationList([]);
            // setClassNameList([]);
        }
    }, []);
    const getStudentList = (event, obj) => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        StudentService.getAllStudentById(userDetails.schoolId,
            //  { classId: event }
        ).then((res) => {
            const studentDetails = res.map(res => {

                return { _id: res._id, studentName: `${res.firstName} ${res.lastName}`, status: true };
            })
            setStudentList(studentDetails);

        }).catch((err) => {
            // setError(err.message);
        });
    }
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
    const handleChangePage=(event, newpage) =>{
        setpg(newpage);
    }
    
    const handleChangeRowsPerPage=(event)=> {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }
    const onSubmit = data => {
        console.log(JSON.stringify(data, null, 2));
    };
    const getSpecialObservationList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        SpecialObservationService.getAllSpecialObservation(userDetails.schoolId).then((res) => {
            setSpecialObservationList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }

    const editSpecialObservation = (observation, status) => {
        const obj = JSON.parse(JSON.stringify(observation));
        obj.studentId = observation.studentId ? observation.studentId._id : '';
        
         setObservation(obj);
        if(status){
           delete obj._id;
        }
        handleOpen();
    }
    const deleteSpecialObservation = (observationdelete) => {
        if (observationdelete) {
            SpecialObservationService.deleteSpecialobservation(observationdelete).then((res) => {
                getSpecialObservationList();
            }).catch((err) => {
            });
        }
    };
    const formik = useFormik({
        initialValues: observation,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            const userDetails = JSON.parse(localStorage.getItem("userDetail"));
            values.schooleId = userDetails.schoolId;
            if (observation._id) {
                SpecialObservationService.upadeSpecialobservation(values).then((res) => {
                    handleClose();
                    getSpecialObservationList();
                    resetForm()
                    alert("Special Observation Updated Successfully.");
                }).catch((err) => {
                });
            }
            else {
                SpecialObservationService.creteSpecialobservation(values).then((res) => {
                    getSpecialObservationList();
                    resetForm();
                    handleClose();
                    alert(" Special Observation Added Successfully.");
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
            <PageTitle title="Special Observation" button={<Button
                variant="contained" onClick={handleOpen}
                size="medium"
                color="secondary" style={{ backgroundColor: '#30875b' }}> Add Observation
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

                        


                                {specialObservationList.slice(pg * rpg, pg * rpg + rpg).map((observation) => (
                                    <TableRow key={observation._id}>
                                          <TableCell className="pl-3 fw-normal" >
                                            {observation.studentId ?observation.studentId.firstName:"" }&nbsp; 
                                        {observation.studentId ?observation.studentId.lastName:"" } 
                                        </TableCell>
                                        {/* <TableCell className="pl-3 fw-normal" >{observation.studentId ?observation.studentId.studentName:""}</TableCell> */}
                                        <TableCell className="pl-3 fw-normal" >{observation.date}</TableCell>
                                        <TableCell className="pl-3 fw-normal" >{observation.specialObservation}</TableCell>
                                        <TableCell>
                                            <EditIcon style={{ cursor: 'pointer' }} onClick={() => editSpecialObservation(observation)} >
                                            </EditIcon >
                                        </TableCell>
                                        <TableCell>
                                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteSpecialObservation(observation)} />
                                        </TableCell>
                                        <TableCell>
                                            <AddIcon style={{ cursor: 'pointer' }} onClick={() => editSpecialObservation(observation,true)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[5, 25, 50, 100, 200, 500, 700, 1000 ]}
                            count={specialObservationList.length}
                            page={pg}
                            onPageChange={handleChangePage}
                            rowsPerPage={rpg}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Widget>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Observation</DialogTitle>
                <form onSubmit={formik.handleSubmit} >
                    <DialogContent style= {{ width: 308 }}>
                    <FormControl variant="standard" fullWidth>
                            <InputLabel id="studentName">Student Name</InputLabel>
                            <Select
                                 autoFocus
                                 InputProps={{ style: { width: 258 } }}
                                labelId="studentName"
                                id="studentName"
                                label="Student Name"
                                name="studentId"
                                value={formik.values.studentId}
                                onChange={e => {
                                    formik.handleChange(e);
                                    getStudentList(e.target.value)
                                }}
                                // onChange={formik.handleChange}
                                error={formik.touched.studentId && Boolean(formik.errors.studentId)}
                                helperText={formik.touched.studentId && formik.errors.studentId}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {studentList.map(({ index, _id, studentName }) => (
                                    <MenuItem key={index} value={_id}>{studentName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>



                        <TextField InputProps={{ style: { width: 250 } }}
                                            id="date"
                                            name="date"
                                            label="Select Date"
                                            type="date"
                                            value={formik.values.date}
                                            onChange={formik.handleChange}
                                            error={formik.touched.date && Boolean(formik.errors.date)}
                                            helperText={formik.touched.date && formik.errors.date}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />       
                                        <TextField
                            InputProps={{ style: { width: 258} }}
                            autoFocus
                            margin="dense"
                            id="specialObservation"
                            name="specialObservation"
                            label="Special Observation"
                            type="text"
                            variant="standard"
                            value={formik.values.specialObservation}
                            onChange={formik.handleChange}
                            error={formik.touched.specialObservation && Boolean(formik.errors.specialObservation)}
                            helperText={formik.touched.specialObservation && formik.errors.specialObservation}
                        />
              
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


