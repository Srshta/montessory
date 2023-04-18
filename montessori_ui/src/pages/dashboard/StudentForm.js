import React, { useState, useMemo } from "react";
import AddClassService from "./Locality/Service/addClassService";

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
import StudentService from "./Locality/Service/studentService";
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
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import BigStat from "./components/BigStat/BigStat";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
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
export default function StudentForm(props, history) {
    const { id } = useParams();
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    var [error, setError] = useState(null);
    const [cityList, setCityList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [addClassList, setAddClassList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [student, setStudent] = useState({
        studentName: '',
        dob: '',
        // classId: '',
        parentName: '',
        mobileNumber: '',
        email: '',
        password: '',
        address: '',
        lane: '',
        selectCity: '',
        doa: '',
        allergies: '',
    });
   
    const city = [
        'Mumbai',
        'Delhi',
        'Bagolore',
        'Hyderbad',
        'Chennai',
    ];
    useEffect(() => {
        getAddClassList();
        if (id !== 'add') {
            getByIdList();
        }
        return () => {
            setStudentList([]);
            setAddClassList([]);

        }
    }, []);
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleOpen = () => {
        props.history.push('/app/studentdetails')
    };
    const handleClose = () => {
        setOpen(false);
    };
    const validationSchema = Yup.object().shape({
        studentName: Yup.string().required('student name  is required'),
        dob: Yup.string().required('select date of birth'),
        // classId: Yup.string().required('class name  is required'),
        parentName: Yup.string().required('parent name  is required'),
        mobileNumber: Yup.string().required()
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be exactly 10 digits'),
        email: Yup.string().required('email is required'),
        password: Yup.string().required('password is required'),
        address: Yup.string().required('Adress is required'),
        lane: Yup.string(),
        selectCity: Yup.string().required('select city'),
        doa: Yup.string().required('select date of admission'),
        allergies: Yup.string(),
    });
    const getByIdList = () => {
        StudentService.getByIdStudent(id).then((res) => {

            setStudent(res);
        }).catch((err) => {
            setError(err.message);
        });
    }
    const getStudentList = () => {
        StudentService.getAllStudent().then((res) => {
            setStudentList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const deleteStudent = (studentdelete) => {
        if (studentdelete) {
            StudentService.deleteStudent(studentdelete).then((res) => {
                getStudentList();
            }).catch((err) => {
            });
        }
    };
    const getAddClassList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        AddClassService.getAllAddClass(userDetails.schoolId).then((res) => {
            setAddClassList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const formik = useFormik({
        initialValues: student,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            const userDetails = JSON.parse(localStorage.getItem("userDetail"));
            values.schooleId = userDetails.schoolId
            if (student._id) {
                StudentService.upadeStudent(values).then((res) => {

                    alert("Student Registration Updated Successfully.");
                    props.history.push('/app/studentdetails');
                })
                    .catch((err) => {
                        alert(err.response.data.message)
                    })
            }
            else {
                StudentService.creteStudent(values).then((res) => {
                    debugger
                    alert(" Student Registration Successfully.");
                    props.history.push('/app/studentdetails');
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
            <Card sx={{ maxWidth: 345 }}>
                <Box   >
                    <div style={{ marginLeft: "7%" }}>
                        <form onSubmit={formik.handleSubmit} >
                            <Grid container spacing={2} columns={12} >
                                <Grid item xs={12}>
                                    <PageTitle InputProps={{ style: { color: '#10b680' } }} title=" Student Registration" ></PageTitle>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField InputProps={{ style: { width: 370 } }}
                                        margin="dense"
                                        autoFocus
                                        id="studentName"
                                        name="studentName"
                                        label="Name Of The Student "
                                        type="text"
                                        variant="standard"
                                        value={formik.values.studentName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.studentName && Boolean(formik.errors.studentName)}
                                        helperText={formik.touched.studentName && formik.errors.studentName}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    {/* <form className={classes.container} noValidate> */}
                                        <TextField InputProps={{ style: { width: 370 } }}
                                            id="dob"
                                            name="dob"
                                            label="Date Of Birth"
                                            type="date"
                                           min="2016-11-10"
                                            max="2022-11-10" 
                                            // defaultValue="2017-05-24"
                                            value={formik.values.dob}
                                            onChange={formik.handleChange}
                                            error={formik.touched.dob && Boolean(formik.errors.dob)}
                                            helperText={formik.touched.dob && formik.errors.dob}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    {/* </form> */}
                                </Grid>
                                {/* <Grid item xs={6}>
                                    <div style={{ width: 370 }}>
                                        <FormControl className={classes.formControl} fullWidth="true"
                                        >
                                            <InputLabel id="demo-simple-select-label">Select Age</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="classId"
                                                label="selectClass"
                                                value={formik.values.classId}
                                                onChange={formik.handleChange}
                                                error={formik.touched.classId && Boolean(formik.errors.classId)}
                                                helperText={formik.touched.classId && formik.errors.classId}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>

                                                {addClassList.map(({ _id, className }) => (
                                    <MenuItem key={_id} value={_id}>{className}
                                        
                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid> */}
                                <Grid item xs={6}>
                                    <TextField
                                        InputProps={{ style: { width: 370 } }}
                                        margin="dense"
                                        id="parentName"
                                        name="parentName"
                                        label="Parent Name"
                                        type="text"
                                        variant="standard"
                                        value={formik.values.parentName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.parentName && Boolean(formik.errors.parentName)}
                                        helperText={formik.touched.parentName && formik.errors.parentName}
                                    />
                                </Grid>
                                <Grid item xs={6}>

                                    <TextField
                                        InputProps={{ style: { width: 370 } }}
                                        margin="dense"
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        label="Mobile Number"
                                        type="text"
                                        variant="standard"
                                        value={formik.values.mobileNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                                        helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                                    />
                                </Grid>
                                <Grid item xs={6}>

                                    <TextField
                                        InputProps={{ style: { width: 370 } }}

                                        margin="dense"
                                        id="email"
                                        name="email"
                                        label="Email"
                                        type="Email"
                                        variant="standard"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="password"
                                        InputProps={{ style: { width: 370 } }}
                                        margin="normal"
                                        label=" Set Password  "
                                        // placeholder="Password"
                                        type="password"
                                        name="password"
                                        value={formik.values.password}

                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}

                                    />
                                </Grid>
                                <Grid item xs={12} style={{ marginTop: '30px' }}>
                                    <span style={{ fontSize: '17px', color: 'rgb(16 182 128)' }} >Address:</span>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        InputProps={{ style: { width: 370 } }}
                                        margin="dense"
                                        id="address"
                                        name="address"
                                        placeholder="Door/Flat/domicile number "
                                        label="Address "
                                        type="text"
                                        variant="standard"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
                                    />



                                </Grid>
                                <Grid item xs={6}>
                                    <div style={{ width: 370 }}>
                                        <FormControl
                                        //  className={classes.formControl}
                                            fullWidth="true" >
                                            <InputLabel id="demo-simple-select-label">Select City</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="selectCity"
                                                name="selectCity"
                                                label="selectCity"
                                                onChange={formik.handleChange}
                                                value={formik.values.selectCity}
                                                error={formik.touched.selectCity && Boolean(formik.errors.selectCity)}
                                                helperText={formik.touched.selectCity && formik.errors.selectCity}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {city.map((city) => (
                                                    <MenuItem key={city} selected={city === 'Nursery'} value={city}  >
                                                        {city}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    {/* <form className={classes.container} noValidate> */}
                                        <TextField InputProps={{ style: { width: 370 } }}
                                            id="doa"
                                            name="doa"
                                            label="Date Of Admission "
                                            type="date"
                                            defaultValue="2017-05-24"
                                            value={formik.values.doa}
                                            onChange={formik.handleChange}
                                            error={formik.touched.doa && Boolean(formik.errors.doa)}
                                            helperText={formik.touched.doa && formik.errors.doa}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    {/* </form> */}
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        InputProps={{ style: { width: 370 } }}
                                        margin="dense"
                                        id="allergies"
                                        name="allergies"
                                        label="Allergies if any"
                                        type="text"
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        value={formik.values.allergies}
                                        error={formik.touched.allergies && Boolean(formik.errors.allergies)}
                                        helperText={formik.touched.allergies && formik.errors.allergies}
                                    />
                                </Grid>
                            </Grid>

                            <div style={{ textAlign: 'right', margin: '29px' }}>
                                <Button style={{ backgroundColor: ' rgb(48 135 91)', color: 'white' }}
                                    type="submit" variant="contained">Submit</Button>
                            </div>
                        </form>
                    </div>
                </Box>
            </Card>
        </>
    );
}


