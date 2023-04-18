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
import ExportExcel from "../../Excelexport";
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
import TablePagination from '@material-ui/core/TablePagination';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import BigStat from "./components/BigStat/BigStat";
import AddIcon from '@material-ui/icons/Add';
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
export default function Reports() {

    const tableHeaders = [ 'Student Name', 'Number Of Working Days','Days Presented','Days Obsented'];
    const classes = useStyles();
    const [activityList, setActivityList] = useState([]);
    const [result, setResult]= useState([]);
    const [reportList, setReportList] = useState([]);
    const [classNameList, setClassNameList] = useState([]);
    const [addClassList, setAddClassList] = useState([]);
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);
    const [startDate1, setStartDate1] = useState('');
    const [endDate1, setEndDate1] = useState('');
    const [age, setAge] = React.useState('');
    var [studentId, setStudentId] = useState("");
    var [error, setError] = useState(null);
    const [studentList, setStudentList] = useState([]);
    const [getReport, setGetReport ]= useState([]);
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
        getStudentList()
        // getActivityList();
        // getAddClassList();
        return () => {
            // setActivityIdList([]);
            // setActivityList([]);
            // setAddClassList([]);
            setReportList([]);
            setStudentList([]);
            setGetReport([]);
            // setClassNameList([]);
        }
    }, []);
    const handleChangeRowsPerPage=(event)=> {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }
    const  excelExport  =(res)  => {
        const result= res.map((response)=>{
 
             return {
                 "Student Name":response.studentDetails[0] ? response.studentDetails[0].studentName : '', 
                 "Count":response.count,
                 "Date":response.present,
                 "Absent":response.absent


                
             }
            
          })
          setResult(result);
     };
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
        const report = JSON.parse(localStorage.getItem("userDetail"));
        const newstartDate1 = startDate1 ? startDate1 : null;
        const newendDate1 = endDate1 ? endDate1 : null;
        const keys = { "schooleId": report.schoolId, "studentId": studentId, "startDate1":newstartDate1,"endDate1":newendDate1 }
        AttendenceService.getStuAttReport(keys).then((res) => {
            excelExport(res);
            setGetReport(res);
            
            // setStudentList(res[0]);
        }).catch((err) => {
            // setError(err.message);
        });
    };
    // const getActivityList = () => {
    //     const userDetails = JSON.parse(localStorage.getItem("userDetail"));
    //     ActivityService.getAllActivity(userDetails.schoolId).then((res) => {
    //         setActivityList(res);
    //     }).catch((err) => {
    //         // setError(err.message);
    //     });
    // }

    const getStudentList = (event, obj) => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        StudentService.getAllStudentById(userDetails.schoolId,
            //  { classId: event }
        ).then((res) => {
            const studentDetails = res.map(res => {
                return { _id: res._id, studentName: res.studentName, status: true };
            })
            setStudentList(studentDetails);

            if (obj) {
                setActivity(obj);
            }
        }).catch((err) => {
            // setError(err.message);
        });
    }
    // const getAddClassList = () => {
    //     const userDetails = JSON.parse(localStorage.getItem("userDetail"));
    //     AddClassService.getAllAddClass(userDetails.schoolId).then((res) => {
    //         setAddClassList(res);
    //     }).catch((err) => {
    //         // setError(err.message);
    //     });
    // }
    const findAttendenceList = (item) => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        const keys = { "classId": classValue, "schooleId": userDetails.schoolId,  "date": dateValue }
        AttendenceService.findAttendenceList(keys).then((res) => {
            debugger
            setDateValue("");
            setClassValue("");
            setStudentList(res[0]);
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
    const editActivity = (activity) => {
        activity.classId = activity.classId ? activity.classId._id : '';
        setActivity(activity)
        handleOpen()
    }
    const deleteActivity = (activitydelete) => {
        if (activitydelete) {
            ActivityService.deleteActivity(activitydelete).then((res) => {
                // getActivityList();
            }).catch((err) => {
            });
        }
    };
    const handleChangePage=(event, newpage) =>{
        setpg(newpage);
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
    return (

        <>
            <PageTitle title="Attendence Reports" />
            <Card sx={{ maxWidth: 345 }}>
                <Box   >
                    <div >
                        <form
                        // onSubmit={formik.handleSubmit} 
                        >
                             <Grid container spacing={2} columns={12} style={{ margin: 10 }}  >
                             <Grid item xs={2} >
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
                            <Grid item xs={2}>
                                    <form className={classes.container} noValidate>
                                    <TextField InputProps={{ style: { width: 160 } }}
                                            id="dob"
                                            name="dob"
                                            label="Start Date"
                                            type="date"
                                           min="2016-11-10"
                                            max="2022-11-10"   
                                            value={startDate1}
                                            onChange={e => {getStudentList(e.target.value); setStartDate1(e.target.value) }}          
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </form>
                                </Grid>
                                <Grid item xs={2} >
                                <TextField InputProps={{ style: { width: 160 } }}
                                            id="dob"
                                            name="dob"
                                            label="End Date"
                                            type="date"
                                           min="2016-11-10"
                                            max="2022-11-10" 
                                            value={endDate1}
                                            onChange={e => {setEndDate1(e.target.value) }}
                                            // defaultValue="2017-05-24"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                </Grid>
                                <Grid item xs={2} >
                                <Button style={{ backgroundColor: 'rgb(48 135 91)', color: 'white' }}
                                 type="button" onClick={() => onSubmit()} variant="contained" >
                                     Search</Button>
                                </Grid>
                                <Grid item xs={2} >
                                <ExportExcel   excelData={result} fileName={'Student Activity'} />
                                </Grid>
                            </Grid>
                            </form>
                </div>  
                </Box>
            </Card>
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
                           
                                {getReport.slice(pg * rpg, pg * rpg + rpg).map((report) => (
                                    <TableRow key={report._id}>
                                     <TableCell className="pl-3 fw-normal" >{report.studentDetails[0]?report.studentDetails[0].studentName:''}</TableCell>
                                     <TableCell className="pl-3 fw-normal" >{report.count}</TableCell>
                                        <TableCell className="pl-3 fw-normal" >{report.present}</TableCell>
                                        <TableCell className="pl-3 fw-normal" >{report.absent}</TableCell>
                                       
                                    </TableRow>
                                    
                                ))}
                                {/* ))} */}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[5, 25, 50, 100, 200, 500, 700, 1000 ]}
                            count={reportList.length}
                            page={pg}
                            onPageChange={handleChangePage}
                            rowsPerPage={rpg}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Widget>
                </Grid>
            </Grid>
        </>
    );
}


