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
export default function MovableAlphabets() {
    const tableHeaders = ['Student Name', 'Vowel-1', 'Vowel-2',	'Vowel-3',	'j', 'e', 'sh',	'ch', 'th',	'ng', 'oo',  'ee',	'oo', 'a-e', 'i-e',	'o-e', 	'u-e (1)',	'u-e (2)', 'le',
    	'qu',	'ssggll',	'Hp -vowel', 'Hp-Const', 'Hg-Vowel', 'Hg-Const'		
    ];
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
    const uploadFile = () => {
        SoundService.uploadImage(formData).then((res) => {
            alert(res.message);
            res.isShowError = true;
            setUploadError(res)
            getSoundList();
        })
    };
    const handleChangeImage = (evt) => {
        console.log("Uploading");
        var file = evt.target.files[0];
        let data = new FormData();
        data.append('image', file);
        setFormData(data)
        console.log("Uploaded");
    }

    const editSound = (sound) => {
        const obj = JSON.parse(JSON.stringify(sound));
        setSound(obj);
        handleOpen();
    }
    const deleteSound = (sounddelete) => {
        if (sounddelete) {
            SoundService.deleteSound(sounddelete).then((res) => {
                getSoundList();
            }).catch((err) => {
            });
        }
    };
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
        event.movableAlphabets[item] = !event.movableAlphabets[item];
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
                    <PageTitle title="Movable Alphabets" 
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
                                        
                                            <input value={sound.movableAlphabets?.Vowel1} checked={sound.movableAlphabets?.Vowel1} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'Vowel1')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.Vowel2} checked={sound.movableAlphabets?.Vowel2} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'Vowel2')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.Vowel3} checked={sound.movableAlphabets?.Vowel3} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'Vowel3')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.j} checked={sound.movableAlphabets?.j} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'j')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.e} checked={sound.movableAlphabets?.e} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'e')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.sh} checked={sound.movableAlphabets?.sh} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'sh')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.ch}  checked={sound.movableAlphabets?.ch} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'ch')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.th} checked={sound.movableAlphabets?.th} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'th')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.ng} checked={sound.movableAlphabets?.ng} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'ng')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.oo} checked={sound.movableAlphabets?.oo} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'oo')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.ee} checked={sound.movableAlphabets?.ee} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'ee')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.oo} checked={sound.movableAlphabets?.oo} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'oo')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.AtoE} checked={sound.movableAlphabets?.AtoE} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'AtoE')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.ItoE} checked={sound.movableAlphabets?.ItoE} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'ItoE')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.OtoE} checked={sound.movableAlphabets?.OtoE} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'OtoE')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.UtoE1} checked={sound.movableAlphabets?.UtoE1} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'UtoE1')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.UtoE2} checked={sound.movableAlphabets?.UtoE2} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'UtoE2')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.le} checked={sound.movableAlphabets?.le} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'le')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.qu} checked={sound.movableAlphabets?.qu} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'qu')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.ssggll} checked={sound.movableAlphabets?.ssggll}  type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'ssggll')} />
                                        </TableCell>
                                    
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.HPvowel} checked={sound.movableAlphabets?.HPvowel} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'HPvowel')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.HPconst} checked={sound.movableAlphabets?.HPconst} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'HPconst')} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.HGvowel} checked={sound.movableAlphabets?.HGvowel} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, index)} />
                                        </TableCell>
                                        <TableCell className="pl-3 fw-normal" >
                                            <input value={sound.movableAlphabets.HGconst} checked={sound.movableAlphabets?.HGconst} type="checkbox"  style={{ height: "15px", width: "15px" }}
                                                onChange={e => handleCheck(sound, 'HGconst')} />
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


