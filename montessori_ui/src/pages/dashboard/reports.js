import React, { useState } from "react";
import {Button,  FormControl, InputLabel, MenuItem, TableRow, Table, TableHead,
     TableBody, TableCell} from "@material-ui/core";
import ExportExcel from "../../Excelexport";
import AttendenceService from "./Locality/Service/attendenceService";
import { Grid, Card, Box, Select, TextField } from "@material-ui/core";
import {  useEffect } from 'react';
import StudentService from "./Locality/Service/studentService";
import TablePagination from '@material-ui/core/TablePagination';
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
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
export default function Reports() {

    const tableHeaders = [ 'Student Name', 'Number Of Working Days','Days Presented','Days Obsented'];
    const classes = useStyles();
    const [result, setResult]= useState([]);
    const [reportList, setReportList] = useState([]);
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);
    const [startDate1, setStartDate1] = useState('');
    const [endDate1, setEndDate1] = useState('');
    const [age, setAge] = React.useState('');
    var [studentId, setStudentId] = useState("");
    const [studentList, setStudentList] = useState([]);
    const [getReport, setGetReport ]= useState([]);
    const [open, setOpen] = React.useState(false);
    const current = new Date();
    const date = `${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}`;
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
        return () => {
            setReportList([]);
            setStudentList([]);
            setGetReport([]);
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
    const onSubmit = data => {
        const report = JSON.parse(localStorage.getItem("userDetail"));
        let newstartDate1 = startDate1 ? startDate1 : null;
        const newendDate1 = endDate1 ? endDate1 : null;
        if(newstartDate1){
            const prior = new Date().setDate(new Date(startDate1).getDate() - 1);
            console.log(new Date(prior).toISOString())
            newstartDate1 =  new Date(prior).toISOString();
        }
    
        const keys = { "schooleId": report.schoolId, "studentId": studentId, "startDate1":newstartDate1,"endDate1":newendDate1 }
        AttendenceService.getStuAttReport(keys).then((res) => {
            excelExport(res);
            setGetReport(res);

        }).catch((err) => {
        });
    };

    const getStudentList = (event, obj) => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        StudentService.getAllStudentById(userDetails.schoolId,

        ).then((res) => {
            const studentDetails = res.map(res => {
                return { _id: res._id, studentName: `${res.firstName} ${res.lastName}`, status: true };
            })
            setStudentList(studentDetails);

            if (obj) {
                setActivity(obj);
            }
        }).catch((err) => {
            // setError(err.message);
        });
    }
   
    const handleChangePage=(event, newpage) =>{
        setpg(newpage);
    }

    return (

        <>
            <PageTitle title="Attendence Reports" />
            <Card sx={{ maxWidth: 345 }}>
                <Box   >
                    <div >
                        <form >
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
                                    <TextField InputProps={{ style: { width: 150 } }}
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
                                <TextField InputProps={{ style: { width: 120 } }}
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
                                <Grid item xs={2}  >
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
                            rowsPerPageOptions={[5, 50, 100, 500, 1000 ]}
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


