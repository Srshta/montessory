import React, { useState } from "react";
import {Button,  FormControl, InputLabel, MenuItem,} from "@material-ui/core";
import StudentService from "./Locality/Service/studentService";
import * as Yup from 'yup';
import { Grid, Card, Box, Select, TextField } from "@material-ui/core";
import { useFormik } from 'formik';
import {  useEffect } from 'react';
import PageTitle from "../../components/PageTitle/PageTitle";
import {  makeStyles } from '@material-ui/core/styles';
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
    const classes = useStyles();
    const [studentList, setStudentList] = useState([]);
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        motherName: '',
        fatherName: '',
        mobileNumber: '',
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
        // getAddClassList();
        // if (id !== 'add') {
        //     getByIdList();
        // }
        return () => {
            setStudentList([]);
        }
    }, []);
 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('student first name  is required'),
        lastName: Yup.string(),
        dob: Yup.string().required('select date of birth'),
        motherName: Yup.string().required('mother name  is required'),
        fatherName: Yup.string().required('father name  is required'),
        mobileNumber: Yup.string().required()
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be exactly 10 digits'),
        address: Yup.string().required('Adress is required'),
        lane: Yup.string(),
        selectCity: Yup.string().required('select city'),
        doa: Yup.string().required('select date of admission'),
        allergies: Yup.string(),
    });
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
                                        id="firstName"
                                        name="firstName"
                                        label="First Name "
                                        type="text"
                                        variant="standard"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField InputProps={{ style: { width: 370 } }}
                                        margin="dense"
                                        autoFocus
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name "
                                        type="text"
                                        variant="standard"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
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
                                        id="motherName"
                                        name="motherName"
                                        label="Mother Name"
                                        type="text"
                                        variant="standard"
                                        value={formik.values.motherName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.motherName && Boolean(formik.errors.motherName)}
                                        helperText={formik.touched.motherName && formik.errors.motherName}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        InputProps={{ style: { width: 370 } }}
                                        margin="dense"
                                        id="fatherName"
                                        name="fatherName"
                                        label="Father Name"
                                        type="text"
                                        variant="standard"
                                        value={formik.values.fatherName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.fatherName && Boolean(formik.errors.fatherName)}
                                        helperText={formik.touched.fatherName && formik.errors.fatherName}
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
                                {/* <Grid item xs={6}>

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
                                </Grid> */}
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


