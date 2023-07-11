import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle,
    TableRow, Table,TableHead, TableBody,TableCell} from "@material-ui/core";
import SuperActivityService from "./Locality/Service/superActivityService";
import ActivityTabelService from "./Locality/Service/activityTabelService";
import * as Yup from 'yup';
import { Grid, TextField } from "@material-ui/core";
import { useFormik } from 'formik';
import {  useEffect } from 'react';
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
export default function Activity() {
    const tableHeaders = [  'Area Of Work','Edit', 'Delete'];
    const classes = useStyles();
    const [superActivityList, setSuperActivityList] = useState([]);
    const [age, setAge] = React.useState('');
    const [tabelIdList, setTabelIdList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [tabel, setTabel] = useState({
        superActivityName: '',
    });
    const validationSchema = Yup.object().shape({
        superActivityName: Yup.string().required('Super Activity Name is required'),
    });
    useEffect(() => {
        getSuperActivityList();
        return () => {
            setTabelIdList([]);
            setSuperActivityList([]);
        }
    }, []);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const getSuperActivityList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        SuperActivityService.getAllSuperActivity(userDetails.schoolId).then((res) => {
            setSuperActivityList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    // const getAddClassList = () => {
    //     const userDetails = JSON.parse(localStorage.getItem("userDetail"));
    //     AddClassService.getAllAddClass(userDetails.schoolId).then((res) => {
    //         setAddClassList(res);
    //     }).catch((err) => {
            
    //     });
    // }
    // const getClassNameList = (event) => {
    //     AddClassService.getAddClassNameById({ className: event.target.value }).then((res) => {
          
    //         setClassNameList(res);

    //     }).catch((err) => {
    //         setError(err.message);
    //     });
    // }
    const editActivityTabel = (tabel) => {
        // tabel.classId = activity.classId ? activity.classId._id :'';
        setTabel(tabel)
        handleOpen()
    }
    const deleteActivityTabel = (tabeldelete) => {
        if (tabeldelete) {
            ActivityTabelService.deleteActivityTabel(tabeldelete).then((res) => {
                getActivityTabelList();
            }).catch((err) => {
            });
        }
    };
    const getActivityTabelList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        ActivityTabelService.getAllActivityTabel(userDetails.schoolId).then((res) => {
            setSuperActivityList(res);
        }).catch((err) => {
           
        });
    }

    const formik = useFormik({
        initialValues: tabel,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            const userDetails = JSON.parse(localStorage.getItem("userDetail"));
            values.schooleId = userDetails.schoolId;
            if (tabel._id) {
                SuperActivityService.upadeSuperActivity(values).then((res) => {
                    handleClose();
                    getSuperActivityList();
                    resetForm()
                    alert("Super Activity Updated Successfully.");
                }).catch((err) => {
                });
            }
            else {
                SuperActivityService.creteSuperActivity(values).then((res) => {
                    getSuperActivityList();
                    resetForm();
                    handleClose();
                    alert("Super Activity Added Successfully.");
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
            <PageTitle title="Area Of Work" button={<Button
                variant="contained" onClick={handleOpen}
                size="medium"
                color="secondary" style={{ backgroundColor: '#30875b' }}> Add Super Activity
            </Button>} />
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
                                {superActivityList.map((tabel) => (
                                    <TableRow key={tabel._id}>
                                       
{/* <TableCell className="pl-3 fw-normal" >{activity.classId ? activity.classId.className : ''}</TableCell> */}
                                        <TableCell className="pl-3 fw-normal" >{tabel.superActivityName}</TableCell>
                                        <TableCell>
                                            <EditIcon style={{ cursor: 'pointer' }} onClick={() => editActivityTabel(tabel)} >
                                            </EditIcon >
                                        </TableCell>
                                        <TableCell>
                                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteActivityTabel(tabel)} />
                                        </TableCell>
        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Widget>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Super Activity</DialogTitle>
                <form onSubmit={formik.handleSubmit} >
                    <DialogContent style= {{ width: 308 }}>
                        <TextField
                            InputProps={{ style: { width: 258 } }}
                            autoFocus
                            margin="dense"
                            id="superActivityName"
                            name="superActivityName"
                            label="Area Of Work"
                            type="text"
                            variant="standard"
                            value={formik.values.superActivityName}
                            onChange={formik.handleChange}
                            error={formik.touched.superActivityName && Boolean(formik.errors.superActivityName)}
                            helperText={formik.touched.superActivityName && formik.errors.superActivityName}
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


