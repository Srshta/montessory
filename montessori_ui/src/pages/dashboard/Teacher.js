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
import TeacherService from "./Locality/Service/teacherService";
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
    const tableHeaders = ['Teacher Name', 'Address', 'Edit', 'Delete'];
    const classes = useStyles();
    const [teacherList, setTeacherList] = useState([]);
    const [classNameList, setClassNameList] = useState([]);
    const [addClassList, setAddClassList] = useState([]);
    const [age, setAge] = React.useState('');
    var [error, setError] = useState(null);
    const [teacherIdList, setTeacherIdList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [teacher, setTeacher] = useState({
        // classId: '',
        teacherName: '',
        email: '',
        password:'',
        // subject: '',
        qualification: '',
        address: '',
        mobileNumber: '',
        // attendence: '',
        // status: '',
    })
    const validationSchema = Yup.object().shape({
        // classId: Yup.string().required('Class Name is required'),
        teacherName: Yup.string().required('teache Name is required'),
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('password is required'),
        // subject: Yup.string().required('Subject is required'),
        qualification: Yup.string().required('Qualification is required'),
        address: Yup.string().required('Address is required'),
        mobileNumber: Yup.string().required()
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be exactly 10 digits'),
        // attendence: Yup.string().required('attendence is required'),
        // status: Yup.string().required('status  is required'),
    });
    useEffect(() => {
        getTeacherList();
        getAddClassList();
        return () => {
            setTeacherIdList([]);
            setTeacherList([]);
            setAddClassList([]);
            // setClassNameList([]);
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
    const onSubmit = data => {
        console.log(JSON.stringify(data, null, 2));
    };
    const getTeacherList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        TeacherService.getAllTeacher(userDetails.schoolId).then((res) => {
            debugger
            setTeacherList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const getAddClassList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        AddClassService.getAllAddClass(userDetails.schoolId).then((res) => {
            setAddClassList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    // const getClassNameList = (event) => {
    //     AddClassService.getAddClassNameById({ className: event.target.value }).then((res) => {
    //         debugger
    //         setClassNameList(res);

    //     }).catch((err) => {
    //         setError(err.message);
    //     });
    // }
    const editTeacher = (teacher) => {
        // teacher.classId = teacher.classId ? teacher.classId._id :'';
        setTeacher(teacher);
        handleOpen();
    }
    const deleteTeacher = (teacherdelete) => {
        if (teacherdelete) {
            TeacherService.deleteTeacher(teacherdelete).then((res) => {
                getTeacherList();
            }).catch((err) => {
            });
        }
    };
    const formik = useFormik({
        initialValues: teacher,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            const userDetails = JSON.parse(localStorage.getItem("userDetail"));
            values.schooleId = userDetails.schoolId;
            if (teacher._id) {
                TeacherService.upadeTeacher(values).then((res) => {
                    handleClose();
                    getTeacherList();
                    resetForm()
                    alert("Teacher Updated Successfully.");
                }).catch((err) => {
                });
            }
            else {
                TeacherService.creteTeacher(values).then((res) => {
                    debugger
                    getTeacherList();
                    resetForm();
                    handleClose();
                    alert(" Teacher Added Successfully.");
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
            <PageTitle title="Teacher" button={<Button
                variant="contained" onClick={handleOpen}
                size="medium"
                color="secondary" style={{ backgroundColor: '#30875b' }}> Add Teacher
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
                                {teacherList.map((teacher) => (
                                    <TableRow key={teacher._id}>
                                        <TableCell className="pl-3 fw-normal" >{teacher.teacherName}</TableCell>
                                        <TableCell className="pl-3 fw-normal" >{teacher.address}</TableCell>
                                        <TableCell>
                                            <EditIcon style={{ cursor: 'pointer' }} onClick={() => editTeacher(teacher)} >
                                            </EditIcon >
                                        </TableCell>
                                        <TableCell>
                                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteTeacher(teacher)} />
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
                <DialogTitle>Add Teacher</DialogTitle>
                <form onSubmit={formik.handleSubmit} >
                    <DialogContent style= {{ width: 308 }}>
                        {/* <FormControl variant="standard" fullWidth="true" >
                            <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="className"
                                name="classId"
                                label="className"
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
                        </FormControl> */}
                        <TextField
                            InputProps={{ style: { width: 258} }}
                            autoFocus
                            margin="dense"
                            id="teacherName"
                            name="teacherName"
                            label="Teacher Name"
                            type="text"
                            variant="standard"
                            value={formik.values.teacherName}
                            onChange={formik.handleChange}
                            error={formik.touched.teacherName && Boolean(formik.errors.teacherName)}
                            helperText={formik.touched.teacherName && formik.errors.teacherName}
                        />
                        <TextField
                            InputProps={{ style: { width: 258 } }}
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email ID"
                            type="text"
                            variant="standard"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />         
                        <TextField
                            id="password"
                            InputProps={{ style: { width: 258 } }}
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
                        {/* <TextField
                            InputProps={{ style: { width: 258 } }}                         
                            margin="dense"
                            id="subject"
                            name="subject"
                            label="Subject"
                            type="text"
                            variant="standard"
                            value={formik.values.subject}
                            onChange={formik.handleChange}
                            error={formik.touched.subject && Boolean(formik.errors.subject)}
                            helperText={formik.touched.subject && formik.errors.subject}
                        /> */}
                        <TextField
                            InputProps={{ style: { width: 258 } }}                            
                            margin="dense"
                            id="qualification"
                            name="qualification"
                            label="Qualification"
                            type="text"
                            variant="standard"
                            value={formik.values.qualification}
                            onChange={formik.handleChange}
                            error={formik.touched.qualification && Boolean(formik.errors.qualification)}
                            helperText={formik.touched.qualification && formik.errors.qualification}
                        />
                        <TextField
                            InputProps={{ style: { width: 258 } }}
                            margin="dense"
                            id="address"
                            name="address"
                            placeholder="enter City Name "
                            label="address "
                            type="text"
                            variant="standard"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />
                        <TextField
                            InputProps={{ style: { width: 258 } }}
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
                        {/* <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">Attendence</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="attendence"
                                name="attendence"
                                value={formik.values.attendence}
                                onChange={formik.handleChange}
                                error={formik.touched.attendence && Boolean(formik.errors.attendence)}
                                helperText={formik.touched.attendence && formik.errors.attendence}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={true}>Present</MenuItem>
                                <MenuItem value={false}>Obsent</MenuItem>

                            </Select>
                        </FormControl> */}
                        {/* <FormControl variant="standard" fullWidth>
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
                        </FormControl> */}
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


