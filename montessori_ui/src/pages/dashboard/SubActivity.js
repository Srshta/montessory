import React, { useState } from "react";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem,
    TableRow, Table,
    TableHead,
    TableBody,
    TableCell
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import SubActivityService from "./Locality/Service/subActivityService";
import ActivityTabelService from "./Locality/Service/activityTabelService";
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
export default function SubActivity() {
    const tableHeaders = ['List Of Activities', 'Exercise', 'Edit', 'Delete'];
    const classes = useStyles();
    const [filterActivity, setfilterActivity] = useState('');
    const [filterExercise, setExercise] = useState('');
    const [filterExerciseList, setExerciseList] = useState([]);
    const [subActivitylList, setSubActivityList] = useState([]);
    const [temSubActivitylList, setTempSubActivityList] = useState([]);
    const [activityList, setActivityList] = useState([]);
    const [age, setAge] = React.useState('');
    var [error, setError] = useState(null);
    const [addActivityList, setAddActivityList] = useState([]);
    const [subActivityIdList, setSubActivityIdList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);
    const [subActivity, setSubActivity] = useState({
        // classId: '',
        subActivityName: '',
    });
    const handleChangePage = (event, newpage) => {
        setpg(newpage);
    }

    const handleChangeRowsPerPage = (event) => {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }
    const validationSchema = Yup.object().shape({
        // classId: Yup.string().required('Class Name is required'),
        subActivityName: Yup.string().required('Sub Activity Name is required'),
    });
    useEffect(() => {
        getSubList();
        getActivityList()

        return () => {
            setSubActivityIdList([]);
            setActivityList([]);
            setSubActivityList([]);
            setTempSubActivityList([]);
            // setAddClassList([]);
            // setClassNameList([]);
        }
    }, []);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const getSubList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        SubActivityService.getAllSubActivity(userDetails.schoolId).then((res) => {

            if (res) {
                setSubActivityList(res);
                setTempSubActivityList(res);
                const setValues = res.map(result => {
                    return { name: result.subActivityName, value: result._id };
                });
                setExerciseList(setValues);

            }

        }).catch((err) => {
            // setError(err.message);
        });
    }
    const getActivityList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        ActivityTabelService.getAllActivityTabel(userDetails.schoolId).then((res) => {
            setAddActivityList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }

    const editSubActivity = (sub) => {
        const obj = JSON.parse(JSON.stringify(sub));
        obj.activityId = sub.activityId ? sub.activityId._id : '';
        // tabel.classId = activity.classId ? activity.classId._id :'';
        setSubActivity(obj)
        handleOpen()
    }
    const deleteSubActivity = (subdelete) => {
        if (subdelete) {
            SubActivityService.deleteSubActivity(subdelete).then((res) => {
                getSubActivityList();
            }).catch((err) => {
            });
        }
    };
    const getSubActivityList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        SubActivityService.getAllSubActivity(userDetails.schoolId).then((res) => {
            setSubActivityList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const formik = useFormik({
        initialValues: subActivity,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            const userDetails = JSON.parse(localStorage.getItem("userDetail"));
            values.schooleId = userDetails.schoolId;
            if (subActivity._id) {
                SubActivityService.upadeSubActivity(values).then((res) => {

                    handleClose();
                    getSubActivityList();
                    resetForm()
                    alert("Sub Activity Tabel Updated Successfully.");
                }).catch((err) => {
                });
            }
            else {
                SubActivityService.creteSubActivity(values).then((res) => {
                    getSubActivityList();
                    resetForm();
                    handleClose();
                    alert(" Sub Activity Tabel Added Successfully.");
                    // props.history.push('/app/vendor');
                })
                    .catch((err) => {
                        alert(err.response.data.message)
                    })
            }

        },
    });
  
    const filterActivitys = (event) => {
const iampig = event ? event._id :'';
        setfilterActivity(iampig);
        if (iampig) {
            const filterValue = temSubActivitylList.filter(act => act.activityId._id === iampig);
            setSubActivityList(filterValue);
            const setValues = filterValue.map(result => {
                return { name: result.subActivityName, value: result._id };
            });
            setExerciseList(setValues);

        } else {
            setSubActivityList(temSubActivitylList);
            const setValues = temSubActivitylList.map(result => {
                return { name: result.subActivityName, value: result._id };
            });
            setExerciseList(setValues);
        }

    }
    // const filterExcDetails = (event) => {
    //     const extId = event?event._id:'';
    //         setExercise(extId);
    //         if (extId) {
    //             const filterValue = temActivitylList.filter(act => act._id === extId);
    //             setTabelList(filterValue);
    //         } else {
    //             setTabelList(temActivitylList);
    //         }
    
    //     }
    const filterExcDetails = (event) => {
        const sub = event ? event.value :'';
        debugger
        setExercise(sub);
        if (sub) {
            const filterValue = temSubActivitylList.filter(act => act._id === sub);
            setSubActivityList(filterValue);
        } else {
            if (filterActivity) {
                const filterValue = temSubActivitylList.filter(act =>{
                    console.log(act.activityId._id);
                    return  act.activityId._id === filterActivity;
                });

                setSubActivityList(filterValue);
            } else {
                setSubActivityList(temSubActivitylList);
            }

        }

    }
    return (
        <>
            <PageTitle title="Exercise"
                button={<Button
                    variant="contained" onClick={handleOpen}
                    size="medium"
                    color="secondary" style={{ backgroundColor: '#30875b' }}> Add Sub Activity
                </Button>}
            />
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <div >
                    <Autocomplete
      id="combo-box-demo"
      options={addActivityList}
      getOptionLabel={(option) => option.activityName}
      style={{ width: 300 }}
      onChange={(event, newValue) => {
        filterActivitys(newValue);
      }}
      renderInput={(params) => <TextField {...params} label="Activities" variant="filled" />}
    />
                        {/* <FormControl variant="filled" fullWidth="true" >
                            <InputLabel id="demo-simple-select-standard-label"> Activities</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="activityName"
                                name="activityId"
                                label="Activities"
                                value={filterActivity}
                                onChange={filterActivitys}
                            //  getClassNameList(e) 
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {addActivityList.map(({ _id, activityName }) => (
                                    <MenuItem key={_id} value={_id}>{activityName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div >
                    <Autocomplete
      id="combo-box-demo"
      options={filterExerciseList}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      onChange={(event, newValue) => {
        filterExcDetails(newValue);
      }}
      renderInput={(params) => <TextField {...params} label="Exercise" variant="filled" />}
    />
                        {/* <FormControl variant="filled" fullWidth="true" >
                            <InputLabel id="demo-simple-select-standard-label"> Exercise</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="activityName"
                                name="activityId"
                                label=" Activities"
                                value={filterExercise}
                                onChange={filterExcDetails}
                            //  getClassNameList(e) 
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {filterExerciseList.map(({ value, name }) => (
                                    <MenuItem key={value} value={value}>{name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}
                    </div>
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
                                {subActivitylList.slice(pg * rpg, pg * rpg + rpg).map((sub) => (
                                    <TableRow key={sub._id}>
                                        <TableCell className="pl-3 fw-normal" >{sub.activityId ? sub.activityId.activityName : ''}</TableCell>
                                        <TableCell className="pl-3 fw-normal" >{sub.subActivityName}</TableCell>
                                        <TableCell>
                                            <EditIcon style={{ cursor: 'pointer' }} onClick={() => editSubActivity(sub)} >
                                            </EditIcon >
                                        </TableCell>
                                        <TableCell>
                                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteSubActivity(sub)} />
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[5, 50, 100, 300, 500, 1000]}
                            count={subActivitylList.length}
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
                        <FormControl variant="standard" fullWidth="true" >
                            <InputLabel id="demo-simple-select-standard-label">List Of Activities</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="activityName"
                                name="activityId"
                                label="List Of Activities"
                                value={formik.values.activityId}
                                onChange={formik.handleChange}
                                //  getClassNameList(e) 
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
                        <TextField
                            InputProps={{ style: { width: 258 } }}
                            autoFocus
                            margin="dense"
                            id="subActivityName"
                            name="subActivityName"
                            label="Exercise"
                            type="text"
                            variant="standard"
                            value={formik.values.subActivityName}
                            onChange={formik.handleChange}
                            error={formik.touched.subActivityName && Boolean(formik.errors.subActivityName)}
                            helperText={formik.touched.subActivityName && formik.errors.subActivityName}
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


