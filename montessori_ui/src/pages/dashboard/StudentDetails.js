import React, { useState } from "react";
import TablePagination from '@material-ui/core/TablePagination';
import { Button, TableRow, Table,TableHead, TableBody, TableCell} from "@material-ui/core";
import ActivityService from "./Locality/Service/activityService";
import { Grid, } from "@material-ui/core";
import { useFormik } from 'formik';
import {  useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
    const tableHeaders = ['First Name', 'Last Name',  'Date Of Birth', 'Father Name','mobileNumber','Edit', 'Delete' ];
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
    });const handleChangePage=(event, newpage) =>{
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
        
    const getStudentList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        StudentService.getAllStudent(userDetails.schoolId).then((res) => {
            setStudentList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }

    
    const editStudent = (id) => {
        // teacher.classId = teacher.classId ? teacher.classId._id :'';
        props.history.push(`/app/studentregistration/${id}`);
        setStudent(student);
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
            <PageTitle title="Student Details" button={<Button
                variant="contained"   onClick={handleOpen}
                size="medium"
                color="secondary" style={{ backgroundColor: '#30875b' }}> Student Registration
            </Button>} />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget title="" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                        <Table className="mb-0">
                            <TableHead >
                                <TableRow>                           
                                <StyledTableCell >First Name</StyledTableCell>
                                <StyledTableCell >Last Name</StyledTableCell>
                                <StyledTableCell >Date Of Birth</StyledTableCell>
                                <StyledTableCell >Father Name</StyledTableCell>
                                <StyledTableCell >Mobile Number</StyledTableCell>
                                        { addUserPermitionsList && addUserPermitionsList.studentDetailsEdit ?
                                        <StyledTableCell >Edit</StyledTableCell>: null }
                                          {addUserPermitionsList && addUserPermitionsList.studentDetailsDelete ?
                                        <StyledTableCell >Delete</StyledTableCell>: null }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {studentList.slice(pg * rpg, pg * rpg + rpg).map((student) => (
                                    <TableRow key={student._id}>
                                        <TableCell className="pl-3 fw-normal" >{student.firstName}</TableCell>
                                        <TableCell className="pl-3 fw-normal" >{student.lastName}</TableCell>
                                        <TableCell className="pl-3 fw-normal" >{student.dob}</TableCell>
                                        <TableCell className="pl-3 fw-normal" >{student.fatherName}</TableCell>
                                        <TableCell className="pl-3 fw-normal" >{student.mobileNumber}</TableCell>
                                        { addUserPermitionsList.studentDetailsEdit ? 
                                        <TableCell>
                                            <EditIcon style={{ cursor: 'pointer' }} onClick={() => editStudent(student._id)} >
                                            </EditIcon >
                                        </TableCell>: null }
                                        { addUserPermitionsList.studentDetailsDelete ?
                                        <TableCell>
                                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteStudent(student._id)} />
                                        </TableCell>: null }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[5, 50, 500, 10000]}
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


