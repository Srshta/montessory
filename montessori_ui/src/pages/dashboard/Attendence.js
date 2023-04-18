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
export default function Attendence() {
    const tableHeaders = ['Class Name', 'Activity Name', 'Status', 'Edit', 'Delete'];
    const classes = useStyles();
    const [activityList, setActivityList] = useState([]);
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
    const [activity, setActivity] = useState({
        classId: '',
        startDate: '',
        endDate: '',
        description: '',
        activityName: '',
        status: '',
    });
    useEffect(() => {
        getActivityList();

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
        const keys = { "classId": classValue, "schooleId": userDetails.schoolId, "studentList": studentList, "teacherId": userDetails._id, "date": dateValue }
        AttendenceService.creteAttendence(keys).then((res) => {
            setDateValue("");
            setClassValue("");
            setStudentList([]);
            alert(" Attendence Successfully.");
        }).catch((err) => {
            debugger
            alert(err.response.data.message);
        });
    };
    const getActivityList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        ActivityService.getAllActivity(userDetails.schoolId).then((res) => {
            setActivityList(res);
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
    const getStudentList = (event) => {
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


    const getClassNameList = (event) => {
        AddClassService.getAddClassNameById({ className: event.target.value }).then((res) => {

            setClassNameList(res);

        }).catch((err) => {
            setError(err.message);
        });
    }
    const editActivity = (activity) => {
        activity.classId = activity.classId ? activity.classId._id : '';
        setActivity(activity)
        handleOpen()
    }
    const deleteActivity = (activitydelete) => {
        if (activitydelete) {
            ActivityService.deleteActivity(activitydelete).then((res) => {
                getActivityList();
            }).catch((err) => {
            });
        }
    };
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
    return (

        <>
            <PageTitle title="Attendence" />
            <Card sx={{ maxWidth: 345 }}>
                <Box   >
                    <div >
                        <form
                        // onSubmit={formik.handleSubmit} 
                        >
                            <Grid container spacing={1} columns={12} style={{ margin: 10 }}  >
                                <Grid item xs={12}>
                                    <form className={classes.container} noValidate>
                                        <TextField
                                            InputProps={{ inputProps: { min: "2020-05-01" } }}
                                            style={{ width: 270 }}
                                            id="date"
                                            name="date"
                                            label="Date "
                                            type="date"
                                            min="2016-11-10"
                                            value={dateValue}
                                            onChange={e =>{ setDateValue(e.target.value); getStudentList(e.target.value)}}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </form>
                                </Grid>
                                {/* <Grid item xs={6} >
                                    <FormControl variant="standard" style={{ width: 270 }} >
                                        <InputLabel id="demo-simple-select-standard-label" >Age</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="className"
                                            name="classId"
                                            label="className"
                                            value={classValue}
                                            onChange={e => { setClassValue(e.target.value); getStudentList(e.target.value) }}
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
                                </Grid> */}
                                <span style={{ fontSize: "larger", marginTop: "20px" }}>Student Details:</span>
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
                                ))}
                            </Grid>
                            <div style={{ textAlign: 'right', margin: '29px' }}>
                                <Button style={{ backgroundColor: 'rgb(48 135 91)', color: 'white' }} type="button" onClick={() => onSubmit()} variant="contained" >Submit</Button>
                            </div>
                        </form>
                    </div>
                </Box>
            </Card>
        </>
    );
}


