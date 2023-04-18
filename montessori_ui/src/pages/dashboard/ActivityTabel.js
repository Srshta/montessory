import React, { useState } from "react";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem,
    TableRow, Table,
    TableHead,
    TableBody,
    TableCell
} from "@material-ui/core";
import ActivityService from "./Locality/Service/activityService";
import ActivityTabelService from "./Locality/Service/activityTabelService";
import * as Yup from 'yup';
import TablePagination from '@material-ui/core/TablePagination';
import { Grid, Select, TextField } from "@material-ui/core";
import { useFormik } from 'formik';
import {  useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AddClassService from "./Locality/Service/addClassService";
import SuperActivityService from "./Locality/Service/superActivityService";
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
    const tableHeaders = [ 'Area Of Work', 'List Of Activities','Edit', 'Delete'];
    const classes = useStyles();
    const [tabelList, setTabelList] = useState([]);
    const [classNameList, setClassNameList] = useState([]);
    const [addClassList, setAddClassList] = useState([]);
    const [age, setAge] = React.useState('');
    var [error, setError] = useState(null);
    const [tabelIdList, setTabelIdList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);
    const [addSuperActivityList, setAddSuperActivityList] = useState([]);
    const [tabel, setTabel] = useState({
        // classId: '',
        superActivityId:'',
        activityName: '',
    });
    const validationSchema = Yup.object().shape({
        // classId: Yup.string().required('Class Name is required'),
        superActivityId:Yup.string().required('super Activity Name is required'),
        activityName: Yup.string().required('Activity Name is required'),
       
    });
    const handleChangePage=(event, newpage) =>{
        setpg(newpage);
    }
    const handleChangeRowsPerPage=(event)=> {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }
    useEffect(() => {
        getTabelList();
        getSuperActivityList();
        // getAddClassList();
        return () => {
            setTabelIdList([]);
            setTabelList([]);
            setAddSuperActivityList([]);
            // setAddClassList([]);
            // setClassNameList([]);
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
    const getActivityTabelList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        ActivityTabelService.getAllActivityTabel(userDetails.schoolId).then((res) => {
            setTabelList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const getTabelList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        ActivityTabelService.getAllActivityTabel(userDetails.schoolId).then((res) => {
            setTabelList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
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
    const onSubmit = data => {
        console.log(JSON.stringify(data, null, 2));
    };
  
    const getAddClassList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetail"));
        AddClassService.getAllAddClass(userDetails.schoolId).then((res) => {
            setAddClassList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const getClassNameList = (event) => {
        AddClassService.getAddClassNameById({ className: event.target.value }).then((res) => {
          
            setClassNameList(res);

        }).catch((err) => {
            setError(err.message);
        });
    }
    const editActivityTabel = (tabel) => {
        const obj = JSON.parse(JSON.stringify(tabel));
        
          obj.superActivityId = tabel.superActivityId ? tabel.superActivityId._id : '';

        //  tabel.superActivityId = tabel.superActivityId ? tabel.superActivityId._id :''; 
        setTabel(obj)
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
  

    const formik = useFormik({
        initialValues: tabel,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            const userDetails = JSON.parse(localStorage.getItem("userDetail"));
            values.schooleId = userDetails.schoolId;
            if (tabel._id) {
                ActivityTabelService.upadeActivityTabel(values).then((res) => {
                    handleClose();
                    getActivityTabelList();
                    // getSuperActivityList()
                    resetForm()
                    alert("Activity Tabel Updated Successfully.");
                }).catch((err) => {
                });
            }
            else {
                ActivityTabelService.creteActivityTabel(values).then((res) => {
                    getActivityTabelList();
                    resetForm();
                    handleClose();
                    alert(" Activity Tabel Added Successfully.");
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
            <PageTitle title="List Of Activities" button={<Button
                variant="contained" onClick={handleOpen}
                size="medium"
                color="secondary" style={{ backgroundColor: '#30875b' }}> Add Activity
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
                                {tabelList.slice(pg * rpg, pg * rpg + rpg).map((tabel) => (
                                    <TableRow key={tabel._id}>
                                        

                                        {/* <TableCell className="pl-3 fw-normal" >{activity.classId ? activity.classId.className : ''}</TableCell> */}
                                        {/* <TableCell className="pl-3 fw-normal" >{sub.activityId ? sub.activityId.activityName : ''}</TableCell> */}
                                        <TableCell className="pl-3 fw-normal" >{tabel.superActivityId ? tabel.superActivityId.superActivityName : ''}</TableCell>
                                        {/* <TableCell className="pl-3 fw-normal" >{tabel.superActivityName}</TableCell> */}
                                        <TableCell className="pl-3 fw-normal" >{tabel.activityName}</TableCell>
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
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[5, 10, 25, 50, 75, 100 ]}
                            count={tabelList.length}
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
                    <DialogContent style= {{ width: 308 }}>
                    <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">Area Of Work</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="superActivityName"
                                label="Area Of Work "
                                name="superActivityId"
                                onChange={formik.handleChange}
                                // onChange={e => { formik.handleChange(e); getSubActivityList(e) }}
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
                        <TextField
                            InputProps={{ style: { width: 258 } }}
                            autoFocus
                            margin="dense"
                            id="activityName"
                            name="activityName"
                            label="List Of Activities"
                            type="text"
                            variant="standard"
                            value={formik.values.activityName}
                            onChange={formik.handleChange}
                            error={formik.touched.activityName && Boolean(formik.errors.activityName)}
                            helperText={formik.touched.activityName && formik.errors.activityName}
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


