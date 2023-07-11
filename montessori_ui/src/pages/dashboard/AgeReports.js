import React, { useState } from "react";
import {
    LinearProgress,
    OutlinedInput,
} from "@material-ui/core";
import { Link } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem,
    TableRow, Table,
    TableHead,
    TableBody,
    TableCell
} from "@material-ui/core";
import TablePagination from '@material-ui/core/TablePagination';
import {
    useParams
  } from "react-router-dom";
import TeacherService from "./Locality/Service/teacherService";
import ActivityService from "./Locality/Service/activityService";
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
import StudentService from "./Locality/Service/studentService";
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
export default function StudentDetails(props, history) {
    const { id } = useParams();

    const tableHeaders = ['Student Name','Date Of Birth' ,'Current Age' ];
    const classes = useStyles();
    const [teacherList, setTeacherList] = useState([]);
    const [classNameList, setClassNameList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [age, setAge] = React.useState('');
    var [error, setError] = useState(null);
    const [teacherIdList, setTeacherIdList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);
    const [addUserPermitionsList, setUserPermitionsList] = useState({studentDetailsEdit:false, studentDetailsDelete:false});
    const [student, setStudent] = useState({
        classId: '',
        teacherName: '',
        email: '',
        subject: '',
        qualification: '',
        address: '',
        mobileNumber: '',
        attendence: '',
        status: '',
    });
    const handleChangePage=(event, newpage) =>{
        setpg(newpage);
    }
  
    const handleChangeRowsPerPage=(event)=> {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }
    useEffect(() => {
        // getTeacherList();
        getStudentList();
        getUserPermitionsList();
        return () => {
            setTeacherIdList([]);
            setTeacherList([]);
            setStudentList([]);
            setUserPermitionsList({})
            // setClassNameList([]);
        }
    }, []);
    const handleOpen = () => {
        props.history.push('/app/studentregistration/add') 
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
    // const getTeacherList = () => {
    //     TeacherService.getAllTeacher().then((res) => {
    //         setTeacherList(res);
    //     }).catch((err) => {
           
    //     });
    // }
    const getUserPermitionsList=()=>{
        const userPermitions= ActivityService.userPermitions();
             setUserPermitionsList(userPermitions);
        }
        function diffDate(date1, date2) {
            var daysDiff = Math.ceil((Math.abs(date1 - date2)) / (1000 * 60 * 60 * 24));
            var years = Math.floor(daysDiff / 365.25);
            var remainingDays = Math.floor(daysDiff - (years * 365.25));
            var months = Math.floor((remainingDays / 365.25) * 12);
            var days = Math.ceil(daysDiff - (years * 365.25 + (months / 12 * 365.25)));
          
            return {
              daysAll: daysDiff,
              years: years,
              months: months,
              days: days
            }
          }
    const getStudentList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        StudentService.getAllStudent(userDetails.schoolId).then((res) => {
            const parseJSONObject = res.map(obj => {
                obj.studentAge = `${diffDate(new Date(obj.dob), new Date()).years} Years  ${diffDate(new Date(obj.dob), new Date()).months} Months `;
               
                return obj;
              }
              );
           
            setStudentList(parseJSONObject);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const editStudent = (id) => {
        // teacher.classId = teacher.classId ? teacher.classId._id :'';
        props.history.push(`/app/studentregistration/${id}`);
        // setStudent(student);
        // handleOpen();
    }
    const deleteStudent= (studentdelete) => {
        if (studentdelete) {
            StudentService.deleteStudent(studentdelete).then((res) => {
                getStudentList();
            }).catch((err) => {
            });
        }
    };
    const formik = useFormik({
        initialValues: student,
        enableReinitialize: true,
        onSubmit: (values, { resetForm }) => {
        //   StudentService.upadeStudent(values).then((res) => {
        //     alert(" Updated Successfully.");
        //   })
        //     .catch((err) => {
        //       alert(err.response.data.message)
        //     })
        },
      });
    return (
        <>
            <PageTitle title="Student Age"  />
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
                                {studentList.slice(pg * rpg, pg * rpg + rpg).map((student) => (
                                    <TableRow key={student._id}>
                                         <TableCell className="pl-3 fw-normal" >
                                            {student.firstName }&nbsp; 
                                        {student.lastName } 
                                        </TableCell>
                                        {/* <TableCell className="pl-3 fw-normal" >{student.studentName}</TableCell> */}
                                        {/* <TableCell className="pl-3 fw-normal" >{student.classId ? student.classId.className:""}</TableCell> */}
                                        <TableCell className="pl-3 fw-normal" >{student.dob}</TableCell>
                                        <TableCell className="pl-3 fw-normal" >{student.studentAge}</TableCell>          
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[5, 10, 50, 100, 300, 500, 1000]}
                            count={studentList.length}
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


