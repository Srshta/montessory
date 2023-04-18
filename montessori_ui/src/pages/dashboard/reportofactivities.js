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
import ActivityTabelService from "./Locality/Service/activityTabelService";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from "@material-ui/core/Divider";
import ActivityService from "./Locality/Service/activityService";
import AttendenceService from "./Locality/Service/attendenceService";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { Grid, Card, Box, Select, TextField } from "@material-ui/core";
import { useFormik } from 'formik';
import { useContext, useEffect } from 'react';
import { useTheme } from "@material-ui/styles";
import StudentService from "./Locality/Service/studentService";
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

import { withStyles, makeStyles, alpha } from '@material-ui/core/styles';
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
export default function ReportOfActivities() {

    const tableHeaders = [ 'Student Name', 'Age', 'Activity Name', 'Sub Activity Name','Key'];
    const classes = useStyles();
    const [activityList, setActivityList] = useState([]);
    const [reportList, setReportList] = useState([]);
    const [classNameList, setClassNameList] = useState([]);
    const [addClassList, setAddClassList] = useState([]);
    const [age, setAge] = React.useState('');
    var [error, setError] = useState(null);
    const [studentList, setStudentList] = useState([]);
    const [activityIdList, setActivityIdList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const current = new Date();
    const date = `${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}`;
    var [dateValue, setDateValue] = useState(date);
    var [classValue, setClassValue] = useState("");
    var [studentId, setStudentId] = useState("");
    var [keyValue, setKeyValue] = useState("");
    const [activity, setActivity] = useState({
        classId: '',
        startDate: '',
        endDate: '',
        description: '',
        activityName: '',
        status: '',
    });
    useEffect(() => {
        getAddClassList();
        return () => {
            setActivityIdList([]);
            setActivityList([]);
            setAddClassList([]);
            setStudentList([]);
            
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
    const ageChange = (attendence) => {

    };
    const onSubmit = data => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        const keys = { "classId": classValue, "schooleId": userDetails.schoolId, "studentId": studentList }
       
    };

    const getAddClassList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        AddClassService.getAllAddClass(userDetails.schoolId).then((res) => {
            setAddClassList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const findActivityList = (item) => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        const keys = { "classId": classValue, "schooleId": userDetails.schoolId, "studentId": studentId, "key":keyValue }
        ActivityService.findActivityList(keys).then((res) => {
            // setClassValue("");
            setActivityList(res);
           // setStudentList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const getClassNameList = (item) => {
        AddClassService.getAddClassNameById({ className: item.target.value }).then((res) => {
            setClassNameList(res);
        }).catch((err) => {
            setError(err.message);
        });
    }
    const handleCheck = (event, item) => {
        var updatedList = studentList.map(res => {
            if (item._id === res._id) {
                return { ...res, status: !res.status };
            }
            return { ...res };
        });
        console.log(updatedList)
        setStudentList(updatedList);
    };
    const getStudentActivityList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
     
        ActivityTabelService.getStudentActivity(userDetails.schoolId).then((res) => {

            setActivityList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const getStudentList = (event,obj) => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        StudentService.getAllStudentById(userDetails.schoolId, { classId: event }).then((res) => {
            const studentDetails = res.map(res => {
                return { _id: res._id, studentName: res.studentName, status: true };
            })
            
            setStudentList(studentDetails);

        }).catch((err) => {
            // setError(err.message);
        });
    }
    return (

        <>
            <PageTitle title="Activity Reports" />
            <Card sx={{ maxWidth: 345 }}>
                <Box   >
                    <div >
                        <form
                        // onSubmit={formik.handleSubmit} 
                        >
                            <Grid container spacing={2} columns={12} style={{ margin: 10 }}  >                           
                                <Grid item xs={3} >
                                <FormControl variant="standard" fullWidth="true" >
                            <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="className"
                                name="classId"
                                label="className"
                               value={classValue}
                                onChange={e => {getStudentList(e.target.value); setClassValue(e.target.value) }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {addClassList.map(({ _id, className }) => (
                                    <MenuItem key={_id} value={_id}>{className}
                                        {/* <Checkbox checked={formik.values.categoryId.indexOf(parent) > -1} /> */}
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                <FormControl variant="standard" fullWidth>
                            <InputLabel id="studentName">Student Name</InputLabel>
                            <Select
                                labelId="studentName"
                                id="studentName"
                                label="Student Name"
                                name="studentId"
                                 value={studentId}
                                onChange={e => {setStudentId(e.target.value) }}
                                // error={formik.touched.studentId && Boolean(formik.errors.studentId)}
                                // helperText={formik.touched.studentId && formik.errors.studentId}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {studentList.map(({index,_id, studentName}) => (
                                    <MenuItem key={index} value={_id}>{studentName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                                </Grid>
                               
                                <Grid item xs={3} >
                                <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">Select Key</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Key"
                                name="key"
                                value={keyValue}
                                onChange={e => {setKeyValue(e.target.value) }}
                               
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"A"}>Works with Assistance </MenuItem>
                                <MenuItem value={"I"}>Works Independently</MenuItem>
                                <MenuItem value={"N"}>Not yet Presented</MenuItem>
                            </Select>
                        </FormControl>
                                </Grid>
                                <Grid item xs={3} >
                                <Button style={{ backgroundColor: 'rgb(48 135 91)', color: 'white' }}
                                 type="button" onClick={() => findActivityList()} variant="contained" >
                                     Search</Button>
                                </Grid>
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
                                                    {activityList.map((activitydetails) => (
                                                        <TableRow key={activitydetails._id}>
                                                            
                                                            <TableCell className="pl-3 fw-normal" >
                                                                <span style={{ fontSize: "larger" }}>{activitydetails.studentId.studentName}</span>
                                                            </TableCell>
                                                            <TableCell className="pl-3 fw-normal" >{activitydetails.classId ? activitydetails.classId.className : ''}</TableCell>
                                                            <TableCell className="pl-3 fw-normal" >{activitydetails.activityId ? activitydetails.activityId.activityName : ''}</TableCell>
                                                            <TableCell className="pl-3 fw-normal" >{activitydetails.subActivityId ? activitydetails.subActivityId.subActivityName : ''}</TableCell>
                                                            {/* <TableCell className="pl-3 fw-normal" >{sub.subActivityName}</TableCell> */}
                                                            <TableCell className="pl-3 fw-normal" >{activitydetails.key}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Widget>
                                    </Grid>
                                </Grid>
                                {/* <span style={{ fontSize: "larger", marginTop: "20px" }}>Student Details:</span>
                                {studentList.map((item, index) => (
                                    <Grid container rowSpacing={1} key={index} style={{ lineHeight: "2" }}>

                                        <Grid item xs={6}>
                                            <span style={{ fontSize: "larger" }}>{item.studentName}</span>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <input value={item.status} type="checkbox" checked={item.status} style={{ height: "15px", width: "15px" }}
                                                //  onChange={handleCheck}
                                                onChange={e => handleCheck(e, item)} />
                                        </Grid>
                                    </Grid>
                                ))} */}
                            </Grid>
                           
                        </form>
                    </div>
                </Box>
            </Card>
        </>
    );
}


