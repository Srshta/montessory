import React, { useState } from "react";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem,
    TableRow, Table,
    TableHead,
    TableBody,
    TableCell
} from "@material-ui/core";
import {  Card, Box } from "@material-ui/core";
import TablePagination from '@material-ui/core/TablePagination';
import ActivityService from "./Locality/Service/activityService";
import ActivityTabelService from "./Locality/Service/activityTabelService";
import SubActivityService from "./Locality/Service/subActivityService";
import StudentService from "./Locality/Service/studentService"
import SuperActivityService from "./Locality/Service/superActivityService"
import * as Yup from 'yup';
import { Grid, Select, TextField } from "@material-ui/core";
import { useFormik } from 'formik';
import { useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AddClassService from "./Locality/Service/addClassService";
import ExportExcel from "../../Excelexport";
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
export default function StudentActivity() {
    const tableHeaders = ['Student Name', 'Area Of Work', 'List Of Activities', 'Exercise','Remarks','Date', 'Edit', 'Delete', 'Add More'];
    const classes = useStyles();
    const [activityList, setActivityList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [subActivityList, setSubActivityList] = useState([]);
    const [classNameList, setClassNameList] = useState([]);
    const [age, setAge] = React.useState('');
    var [error, setError] = useState(null);
    const [activityIdList, setActivityIdList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [isAdd, setIsAdd] = React.useState(false);
    const [subActivityIdList, setSubActivityIdList] = useState([]);
    const [addActivityList, setAddActivityList] = useState([]);
    const [addSuperActivityList, setAddSuperActivityList] = useState([]);
    const [startDate1, setStartDate1] = useState('');
    const [endDate1, setEndDate1] = useState('');
    const [result, setResult]= useState([]);
    var [studentId, setStudentId] = useState("");
    const today = new Date();
    const getWeekStartEnd = (date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(date);
        endOfWeek.setDate(endOfWeek.getDate() + (5 - endOfWeek.getDay()));

        let startDay = startOfWeek.getDate();
        let startMonth = startOfWeek.getMonth()+1;
        let startYear = startOfWeek.getFullYear();
        if (startDay < 10) {
            startDay = '0' + startDay;
        }
        
        if (startMonth < 10) {
            startMonth = `0${startMonth}`;
        }
        let format = startYear  + "-" + startMonth + "-" + startDay;

        let endDay = endOfWeek.getDate();
        let endMonth = endOfWeek.getMonth()+1;
        let endYear = endOfWeek.getFullYear();
        if (endDay < 10) {
            endDay = '0' + endDay;
        }
        
        if (endMonth < 10) {
            endMonth = `0${endMonth}`;
        }
      
        let format1 = endYear + "-" + endMonth + "-" + endDay;
        
        return { start: format, end: format1 };
    }
    const date = new Date();
const week = getWeekStartEnd(date);
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);
  const year = today.getFullYear();
    const [activity, setActivity] = useState({
        // classId: '',
        date:'',
        studentId: '',
        superActivityId: '',
        activityId: '',
        subActivityId: '',
        // academicYear:'',
        remarks: '',
        planning: '',
    });

    const handleChangePage=(event, newpage) =>{
        setpg(newpage);
    }
   
    const handleChangeRowsPerPage=(event)=> {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }
    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    //   };
    
    //   const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    //   };
    const validationSchema = Yup.object().shape({
        // classId: Yup.string().required('Class Name is required'),
        date: Yup.string().required('Date is required'),
        studentId: Yup.string().required('Student Name is required'),
        activityId: Yup.string().required('ActivityName is required'),
        subActivityId: Yup.string().required('Sub ActivityName is required'),
        // academicYear:Yup.string(),
        remarks: Yup.string(),
        planning: Yup.string(),
        date:Yup.string(),
    });
    useEffect(() => {
        //getActivityList();
        onSubmit();
       // getStudentActivityList();
        getStudentList()
        getSuperActivityList();
        return () => {
            setSubActivityList([]);
            setActivityIdList([]);
            setActivityList([]);
            setStudentList([]);
            setAddSuperActivityList([]);
        }
    }, []);
    const getSuperActivityList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        SuperActivityService.getAllSuperActivity(userDetails.schoolId).then((res) => {
            setAddSuperActivityList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const handleOpen = (isAdd) => {
        setOpen(true);
        if(isAdd){
            setActivity({
                date:'',
                studentId: '',
                superActivityId: '',
                activityId: '',
                subActivityId: '',
                remarks: '',
                planning: '',
            });
        }
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

    const  excelExport  =(res)  => {
       const result= res.map((response)=>{

 
            return {
                "Student Name":response.studentId ?`${ response.studentId.firstName } ${response.studentId.lastName}`: '' , 
                "Area Of Work": response.superActivityId ? response.superActivityId. superActivityName:'',
                "List Of Activities": response.activityId ? response.activityId.activityName:'',
                "Exercise":response.subActivityId ? response.subActivityId.subActivityName:'',
                "Remarks":response.remarks,
                "Key":response.key,
                "Date":response.date,
            }
           
         })
         setResult(result);
    };


    const onSubmit = data => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));

        const newstartDate1 = startDate1 ? startDate1 :"";
        const newendDate1 = endDate1 ? endDate1 :"";
        const keys = {  "schooleId": userDetails.schoolId,  "studentId": studentId, "startDate1":newstartDate1,"endDate1":newendDate1  }
        ActivityService.findActivityList(keys).then((res) => {
            excelExport(res);
            console.log(res)
            // setClassValue("");
            setActivityList(res);
           // setStudentList(res);
        }).catch((err) => {
            console.error(err)
            // setError(err.message);
        });
        
    };
    const getSubActivityList = (event, obj) => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        const getsubActList = { schooleId: userDetails.schoolId, activityId: event.target.value };
        SubActivityService.getAllSubActivityByActivityId(getsubActList).then((res) => {
            setSubActivityList(res);
            if (obj) {
                setActivity(obj);
            }
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const getActivityList = (event, obj) => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        const getsubActList = { schooleId: userDetails.schoolId, superActivityId: event.target.value };
        ActivityTabelService.getAllActivityTabeBySuperActivityId(getsubActList).then((res) => {
            setAddActivityList(res);
            if (obj) {
                setActivity(obj);
            }
        }).catch((err) => {
            // setError(err.message);
        });
    }

    const getStudentList = (event, obj) => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        
        StudentService.getAllStudentById(userDetails.schoolId,
            //  { classId: event }
        ).then((res) => {
            const studentDetails = res.map(res => {
                return { _id: res._id, studentName: `${res.firstName} ${res.lastName}`, status: true };
            });
            
            setStudentList(studentDetails);

            if (obj) {
                setActivity(obj);
            }
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const getStudentActivityList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));

        ActivityTabelService.getStudentActivity(userDetails.schoolId, false).then((res) => {
            setActivityList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }

    const editActivity = (useractivitys, status) => {
        const obj = JSON.parse(JSON.stringify(useractivitys, status));
        //    obj.classId = useractivitys.classId ? useractivitys.classId._id : '';
        obj.studentId = useractivitys.studentId ? useractivitys.studentId._id : '';
        obj.superActivityId = useractivitys.superActivityId ? useractivitys.superActivityId._id : '';
        obj.activityId = useractivitys.activityId ? useractivitys.activityId._id : '';
        obj.subActivityId = useractivitys.subActivityId ? useractivitys.subActivityId._id : '';

        getStudentList(
            // obj.classId,
            obj);
        getSubActivityList({ target: { value: obj.activityId } }, obj);
         getActivityList({ target: { value: obj.superActivityId } }, obj);
        //getStudentActivityList(useractivitys.classId);
        if(status){
           delete obj._id;
        }
        setActivity(obj);

        handleOpen()
    }

    const deleteActivity = (activitydelete) => {
        if (activitydelete) {
            ActivityService.deleteActivity(activitydelete).then((res) => {

                onSubmit()
            }).catch((err) => {
            });
        }
    };
    const formik = useFormik({
        initialValues: activity,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            const userDetails = JSON.parse(localStorage.getItem("userDetail"));
            values.schooleId = userDetails.schoolId;
            values.authorizedPerson = userDetails.email
            values.isFuturePlanning = false
            if (activity._id) {
                ActivityService.upadeActivity(values).then((res) => {
                    handleClose();
                    // getActivityList();
                    onSubmit()
                    resetForm()
                    alert("Activity Updated Successfully.");
                }).catch((err) => {
                });
            }
            else {
                let currentYear = new Date().getFullYear();
                let nextYear = new Date().getFullYear() + 1;
                console.log(currentYear + "-" + nextYear);
                values['academicYear'] = currentYear + "-" + nextYear;
                ActivityService.creteActivity(values).then((res) => {
                    // getActivityList();
                    onSubmit()
                    resetForm();
                    handleClose();
                    alert(" Activity Added Successfully.");
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
            <PageTitle title="Student Activity" button={<Button
                variant="contained" onClick={() => handleOpen(true) }
                size="medium"
                color="secondary" style={{ backgroundColor: '#30875b' }}> Add Activity
            </Button>} />
            
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
                            <Grid item xs={3}>
                                    <form className={classes.container} noValidate>
                                    <TextField InputProps={{ style: { width: 190 } }}
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
                                <TextField InputProps={{ style: { width: 140 } }}
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
                                 type="button"
                                 
                                  onClick={() => onSubmit()} variant="contained" 
                                 >
                                    
                                     Search</Button>
                                </Grid>
                                <Grid item xs={2} >
                                <ExportExcel  style={{fontSize:"11px"}} excelData={result} fileName={'Student Activity'} />
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
                           
                                {activityList.slice(pg * rpg, pg * rpg + rpg).map((activitydetails) => (
                                    <TableRow key={activitydetails._id}>


                                        <TableCell className="pl-3 fw-normal" >
                                            {activitydetails.studentId ?activitydetails.studentId.firstName:"" }&nbsp; 
                                        {activitydetails.studentId ?activitydetails.studentId.lastName:"" } 
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >{activitydetails.superActivityId ? activitydetails.superActivityId.superActivityName : ''}</TableCell>
                                        <TableCell className="pl-3 fw-normal" >{activitydetails.activityId ? activitydetails.activityId.activityName : ''}</TableCell>
                                        <TableCell className="pl-3 fw-normal" >{activitydetails.subActivityId ? activitydetails.subActivityId.subActivityName : ''}</TableCell>
                                        <TableCell className="pl-3 fw-normal" >{activitydetails.remarks}</TableCell>
                                        <TableCell className="pl-3 fw-normal" >{activitydetails.date}</TableCell>
                                        <TableCell>
                                            <EditIcon style={{ cursor: 'pointer' }} onClick={() => editActivity(activitydetails,false)} >
                                            </EditIcon >
                                        </TableCell>
                                        <TableCell>
                                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteActivity(activitydetails._id)} />
                                        </TableCell>
                                        <TableCell>
                                            <AddIcon style={{ cursor: 'pointer' }} onClick={() => editActivity(activitydetails,true)} />
                                        </TableCell>

                                    </TableRow>
                                ))}
                                {/* ))} */}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[5, 25, 50, 100, 200, 500, 700, 1000 ]}
                            count={activityList.length}
                            page={pg}
                            onPageChange={handleChangePage}
                            rowsPerPage={rpg}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Widget>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Activity</DialogTitle>
                <form onSubmit={formik.handleSubmit} >
                    <DialogContent style={{ width: 308 }}>
                        {/* <FormControl variant="standard" fullWidth="true" >
                            <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="className"
                                name="classId"
                                label="className"
                                value={formik.values.classId}
                                onChange={e => { formik.handleChange(e); getStudentList(e.target.value) }}
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
                         <TextField InputProps={{ style: { width: 250 } }}
                                            id="date"
                                            name="date"
                                            label="Date"
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
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="studentName">Student Name</InputLabel>
                            <Select
                                 autoFocus
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
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">Area Of Work</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="superActivityName"
                                label="Area Of Work "
                                name="superActivityId"
                                onChange={e => { formik.handleChange(e); getActivityList(e) }}
                                value={formik.values.superActivityId}
                                error={formik.touched.superActivityId && Boolean(formik.errors.superActivityId)}
                                helperText={formik.touched.superActivityId && formik.errors.superActivityId}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {addSuperActivityList.map(({ _id, superActivityName }) => (

                                    <MenuItem key={_id} value={_id}>{superActivityName}
                                        {/* <Checkbox checked={formik.values.categoryId.indexOf(parent) > -1} /> */}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">List Of Activities</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="activityName"
                                label="List Of Activities"
                                name="activityId"
                                onChange={e => { formik.handleChange(e); getSubActivityList(e) }}
                                value={formik.values.activityId}
                                error={formik.touched.activityId && Boolean(formik.errors.activityId)}
                                helperText={formik.touched.activityId && formik.errors.activityId}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {addActivityList.map(({ _id, activityName }) => (

                                    <MenuItem key={_id} value={_id}>{activityName}
                                        {/* <Checkbox checked={formik.values.categoryId.indexOf(parent) > -1} /> */}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="subActivityName">Exercise</InputLabel>
                            <Select
                                labelId="subActivityName"
                                id="subActivityId"
                                label="Exercise"
                                name="subActivityId"
                                value={formik.values.subActivityId}
                                onChange={formik.handleChange}
                                error={formik.touched.subActivityId && Boolean(formik.errors.subActivityId)}
                                helperText={formik.touched.subActivityId && formik.errors.subActivityId}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {subActivityList.map(({ _id, subActivityName }) => (
                                    <MenuItem key={_id} value={_id}>{subActivityName}
                                        {/* <Checkbox checked={formik.values.categoryId.indexOf(parent) > -1} /> */}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">Select Key</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Key"
                                name="key"
                                value={formik.values.key}
                                onChange={formik.handleChange}
                                error={formik.touched.key && Boolean(formik.errors.key)}
                                helperText={formik.touched.key && formik.errors.key}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"A"}>Works with Assistance </MenuItem>
                                <MenuItem value={"I"}>Works Independently</MenuItem>
                                <MenuItem value={"N"}> Presented</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField InputProps={{ style: { width: 258 } }}
                            margin="dense"
                            id="remarks"
                            name="remarks"
                            label="Remarks"
                            type="text"
                            variant="standard"
                            value={formik.values.remarks}
                            onChange={formik.handleChange}
                            error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                            helperText={formik.touched.remarks && formik.errors.remarks}
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


