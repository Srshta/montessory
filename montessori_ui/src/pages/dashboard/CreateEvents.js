
import Calendar from 'react-calendar';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem,
  TableRow, Table,
  TableHead,
  TableBody,
  TableCell
} from "@material-ui/core";
import Widget from "../../components/Widget/Widget";
import TablePagination from '@material-ui/core/TablePagination';
import PageTitle from "../../components/PageTitle/PageTitle";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import CalelnderEventsService from "./Locality/Service/calelnderEventsService";
import { useFormik } from 'formik';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import { Grid, Select, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from 'react';
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
function CreateEvents() {
  const tableHeaders = ['Event Name', 'Date And Time'];
  const [date, setDate] = useState(new Date());
  const [eventList, setEventList] = useState([]);
  var [dateValue, setDateValue] = useState(date);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [events, setEvents] = useState({
    teacherId: '',
    dateTime: '',
  });
  const validationSchema = Yup.object().shape({
    dateTime: Yup.string(),
  });
  const handleChangePage = (event, newpage) => {
    setpg(newpage);
  }

  const handleChangeRowsPerPage = (event) => {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }
  useEffect(() => {
    getCalelnderEventsList();

    return () => {
      setEventList([]);
    }
  }, []);
  const getCalelnderEventsList = () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetail"));
    CalelnderEventsService.getAllCalelnderEvents(userDetails.schoolId).then((res) => {
      setEventList(res);
    }).catch((err) => {
      // setError(err.message);
    });
  }
  const deleteActivityTabel = (eventdelete) => {
    if (eventdelete) {
      CalelnderEventsService.deleteCalelnderEvents(eventdelete).then((res) => {
        getCalelnderEventsList();
      }).catch((err) => {
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const formik = useFormik({
    initialValues: events,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const userDetails = JSON.parse(localStorage.getItem("userDetail"));
      const keys = { "schooleId": userDetails.schoolId, "teacherId": userDetails._id, "date": dateValue }
      values.schooleId = userDetails.schoolId;
      values.teacherId = userDetails._id;
      if (events._id) {
        CalelnderEventsService.upadeCalelnderEvents(values).then((res) => {
          handleClose();
          getCalelnderEventsList();
          resetForm()
          alert("Calelnder Events Updated Successfully.");
        }).catch((err) => {
        });
      }
      else {
        CalelnderEventsService.creteCalelnderEvents(values).then((res) => {
          setDateValue("");
          getCalelnderEventsList();
          resetForm();
          handleClose();
          alert(" Calelnder Events Added Successfully.");
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
      <PageTitle title="Create Events " button={<Button
        variant="contained" onClick={handleOpen}
        size="medium"
        color="secondary" style={{ backgroundColor: '#30875b' }}> Create Event
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
                {eventList.slice(pg * rpg, pg * rpg + rpg).map((event) => (
                  <TableRow key={event._id}>
                    {/* <TableCell className="pl-3 fw-normal" >{event.teacherId}</TableCell> */}
                    <TableCell className="pl-3 fw-normal" >{event.eventName}</TableCell>
                    <TableCell className="pl-3 fw-normal" >{event.dateTime}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              count={eventList.length}
              page={pg}
              onPageChange={handleChangePage}
              rowsPerPage={rpg}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Widget>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Event</DialogTitle>
        <form onSubmit={formik.handleSubmit} >
          <DialogContent style={{ width: 308 }}>

            <TextField
              InputProps={{ style: { width: 258 } }}
              autoFocus
              margin="dense"
              id="eventName"
              name="eventName"
              label="Event Name"
              type="text"
              variant="standard"
              value={formik.values.eventName}
              onChange={formik.handleChange}
              error={formik.touched.eventName && Boolean(formik.errors.eventName)}
              helperText={formik.touched.eventName && formik.errors.eventName}
            />
            <form className={classes.container} noValidate>
              <TextField InputProps={{ style: { width: 253 } }}
                id="dateTime"
                name="dateTime"
                autoFocus
                label="Select  Date"
                type="datetime-local"
                value={formik.values.dateTime}
                onChange={formik.handleChange}
                error={formik.touched.dateTime && Boolean(formik.errors.dateTime)}
                helperText={formik.touched.dateTime && formik.errors.dateTime}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* <TextField InputProps={{ style: { width: 258 } }}
                id="dateTime"
                
                name='dateTime'
                label="Select Date And Time"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                
                value={formik.values.dateTime}
                onChange={formik.handleChange}
                error={formik.touched.dateTime && Boolean(formik.errors.dateTime)}
                helperText={formik.touched.dateTime && formik.errors.dateTime}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              /> */}
            </form>
            {/* <form className={classes.container} noValidate>
              <TextField InputProps={{ style: { width: 258 } }}
                id="startDate"
                name="startDate"
                label="startDate"
                type="date"
                // value={dateValue}
                                            // onChange={e => setDateValue(e.target.value)}
                                           
                // defaultValue="2017-05-24"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                helperText={formik.touched.startDate && formik.errors.startDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField InputProps={{ style: { width: 258 } }}
                id="startTime"
                name="startTime"
                label="startTime"
                type="time"
                // defaultValue="2017-05-24"
                value={formik.values.startTime}
                onChange={formik.handleChange}
                error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                helperText={formik.touched.startTime && formik.errors.startTime}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form> */}
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
export default CreateEvents;