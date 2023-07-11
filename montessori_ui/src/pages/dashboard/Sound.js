import React, { useState } from "react";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem,
    TableRow, Table,
    TableHead,
    TableBody,
    TableCell
} from "@material-ui/core";
import {  Card, Box } from "@material-ui/core";
import StudentService from "./Locality/Service/studentService"
import SoundService from "./Locality/Service/soundService";
import * as Yup from 'yup';
import TablePagination from '@material-ui/core/TablePagination';
import { Grid, Select, TextField } from "@material-ui/core";
import { useFormik } from 'formik';
import { useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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
export default function Sound() {
    const tableHeaders = ['Student Name', 'SPL', 'a', 'i', 'o', 'u', 'e', 'm', 'n', 'r', 's', 'l',
        'f', 'h', 'v', 'y', 'z', 'w', 'k', 't', 'p', 'b', 'd', 'g', 'j', 'c', 'x', 'q'];
    const classes = useStyles();
    const [studentList, setStudentList] = useState([]);
    const [soundList, setSoundList] = useState([]);
    const [formData, setFormData] = useState("");
    const [age, setAge] = React.useState('');
    var [error, setError] = useState(null);
    var [uploadError, setUploadError] = useState({ isShowError: false, successCount: 0, error: [], message: "" });
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);
    const current = new Date();
    const date = `${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}`;
    var [dateValue, setDateValue] = useState(date);
    const [sound, setSound] = useState({
        sound: '',
        studentId: '',
    });
    const validationSchema = Yup.object().shape({
        sound: Yup.string().required('Sound is required'),
    });
    const handleChangePage = (event, newpage) => {
        setpg(newpage);
    }
    const handleChangeRowsPerPage = (event) => {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }
    useEffect(() => {
        getSoundList();
        getStudentList()
        return () => {
            setSoundList([]);
            setStudentList([]);
        }
    }, []);
    const getSoundList = () => {
        SoundService.getAllSound().then((res) => {
            setSoundList(res);
        }).catch((err) => {
            setError(err.message);
        });
    }
    const handleOpen = () => {
        setOpen(true);
    };
    const handleOpen1 = () => {
        setOpen1(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
  
    const handleChangeImage = (evt) => {
        console.log("Uploading");
        var file = evt.target.files[0];
        let data = new FormData();
        data.append('image', file);
        setFormData(data)
        console.log("Uploaded");
    }

    const getStudentList = (event, obj) => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        StudentService.getAllStudentById(userDetails.schoolId,
        ).then((res) => {
            const studentDetails = res.map(res => {
                return {
                    ...res,studentName: `${res.firstName} ${res.lastName}`,
                    
                };
            });
            
            setStudentList(studentDetails);

        }).catch((err) => {
            // setError(err.message);
        });
    }

    const formik = useFormik({
        initialValues: sound,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (sound._id) {
                SoundService.upadeSound(values).then((res) => {
                    handleClose();
                    getSoundList();
                    resetForm()
                    alert(" Sounds Updated Successfully.");
                }).catch((err) => {
                });
            }
            else {
                SoundService.creteSound(values).then((res) => {
                    getSoundList();
                    resetForm();
                    handleClose();
                    alert(" Sounds Added Successfully.");
                })
                    .catch((err) => {
                        alert(err.response.data.message)
                    })
            }

        },
    });
    const handleCheck = (event, item) => {
        // event.sounds.SPL
        event.sounds[item] = !event.sounds[item];
        // obj['a'] = true;
        debugger
        StudentService.upadeStudent( event).then((res) => {
            getStudentList();
            
        })
            .catch((err) => {
                alert(err.response.data.message)
            })
        // var updatedList = studentList.map(res => {
        //     if (item._id === res._id) {
        //         return { ...res, status: !res.status };
        //     }
        //     return { ...res };
        // });
        // console.log(updatedList)
        // setStudentList(updatedList);
    };
    const onSubmit = data => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        const keys = {  "schooleId": userDetails.schoolId, "studentList": studentList, "teacherId": userDetails._id,
         "date": dateValue
         }
        SoundService.creteSound(keys).then((res) => {
            setDateValue("");
            setStudentList([]);
            alert(" Attendence Successfully.");
        }).catch((err) => {
            debugger
            alert(err.response.data.message);
        });
    };
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <PageTitle title="Sounds" 
                    />

                </Grid>
                
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
                                {studentList.slice(pg * rpg, pg * rpg + rpg).map((sound, index) => (
                                    <TableRow key={sound._id}>
                                        <TableCell className="pl-3 fw-normal" > {sound.studentName}  </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                           
                                            <input value={sound.sounds?.SPL} checked={sound.sounds?.SPL} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'SPL')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.a } checked={sound.sounds?.a} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'a')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.i} checked={sound.sounds?.i} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'i')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.o} checked={sound.sounds?.o} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'o')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.u} checked={sound.sounds?.u} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'u')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.e} checked={sound.sounds?.e} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'e')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.m} checked={sound.sounds?.m} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'm')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.n} checked={sound.sounds?.n} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'n')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.r}  checked={sound.sounds?.r} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'r')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.s} checked={sound.sounds?.s} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 's')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.l} checked={sound.sounds?.l}  type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'l')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.f} checked={sound.sounds?.f} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'f')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.h} checked={sound.sounds?.h} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'h')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.v} checked={sound.sounds?.v} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'v')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.y} checked={sound.sounds?.y} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'y')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.z} checked={sound.sounds?.z} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'z')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.w} checked={sound.sounds?.w} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'w')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.k}  checked={sound.sounds?.k} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'k')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.t} checked={sound.sounds?.t} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 't')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.p} checked={sound.sounds?.p} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'p')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.b} checked={sound.sounds?.b} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'b')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.d} checked={sound.sounds?.d} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'd')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.g} checked={sound.sounds?.g} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'g')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.j} checked={sound.sounds?.j} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'j')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.c} checked={sound.sounds?.c} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'c')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.x}  checked={sound.sounds?.x} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'x')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.sounds?.q} checked={sound.sounds?.q} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'q')} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[5, 50, 100, 500, 1000]}
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


