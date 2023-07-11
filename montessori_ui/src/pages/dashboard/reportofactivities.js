import React, { useState } from "react";
import { Button,  FormControl, InputLabel, MenuItem,
    TableRow, Table,TableHead, TableBody, TableCell} from "@material-ui/core";
import ActivityTabelService from "./Locality/Service/activityTabelService";
import ActivityService from "./Locality/Service/activityService";
import { Grid, Card, Box, Select } from "@material-ui/core";
import {  useEffect } from 'react';
import StudentService from "./Locality/Service/studentService";
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
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
export default function ReportOfActivities() {

    const tableHeaders = [ 'Student Name', 'Age', 'Activity Name', 'Sub Activity Name','Key'];
    const classes = useStyles();
    const [activityList, setActivityList] = useState([]);
    const [addClassList, setAddClassList] = useState([]);
    const [age, setAge] = React.useState('');
    var [error, setError] = useState(null);
    const [studentList, setStudentList] = useState([]);
    const [activityIdList, setActivityIdList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const current = new Date();
    var [classValue, setClassValue] = useState("");
    var [studentId, setStudentId] = useState("");
    var [keyValue, setKeyValue] = useState("");

    useEffect(() => {
        getAddClassList();
        return () => {
            setActivityIdList([]);
            setActivityList([]);
            setAddClassList([]);
            setStudentList([]);
        }
    }, []);
   
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
        
            setActivityList(res);
           // setStudentList(res);
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
                             
                            </Grid>
                           
                        </form>
                    </div>
                </Box>
            </Card>
        </>
    );
}


