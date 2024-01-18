
import Calendar from 'react-calendar';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem,
  TableRow, Table,
  TableHead,
  TableBody,
  TableCell
} from "@material-ui/core";
import interactionPlugin from '@fullcalendar/interaction'
import CalelnderEventsService from "./Locality/Service/calelnderEventsService";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from "react";
import {  useEffect } from 'react';
function CalelnderEvents() {
  const [date, setDate] = useState(new Date());
  const [eventList, setEventList] = useState([]);
  const [title, setTitle] =useState('');
  const [open, setOpen] = React.useState(false);
  const [events, setEvents] = useState({
    teacherId: '',
    startDate: '',
    endDate: '',
});
let tooltipInstance = null;

const validationSchema = Yup.object().shape({
  startDate: Yup.string(),
  endDate: Yup.string(),
});
useEffect(() => {
  getCalelnderEventsList();

  return () => {
    setEventList([]);
  }
}, []);
const getCalelnderEventsList = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetail"));
  CalelnderEventsService.getAllCalelnderEvents(userDetails.schoolId).then((res) => {
   
  //   const persons = this.state.name.map((item, i) => {
  //     return 
  //        (<div>
  //           <h1> {item.name} </h1> 
  //        </div>);
  // });
const mapEventData = res.map(res=>{
  return {title:res.eventName,date:res.dateTime};
})
    setEventList(mapEventData);
  }).catch((err) => {
      // setError(err.message);
  });
}
// const deleteActivityTabel = (eventdelete) => {
//   if (eventdelete) {
//     CalelnderEventsService.deleteCalelnderEvents(eventdelete).then((res) => {
//       getCalelnderEventsList();
//       }).catch((err) => {
//       });
//   }
// };
const handleMouseEnter = (info) => {

  if (info.event._def && info.event._def.title) {
    setOpen(true)
    setTitle(info.event._def.title);
    // tooltipInstance = new Tooltip(info.el, {
    //   title: info.event.extendedProps.description,
    //   html: true,
    //   placement: "top",
    //   trigger: "hover",
    //   container: "body"
    // });

    // tooltipInstance.show();
  }
};

const handleMouseLeave = (info) => {
  // if (open) {
  //   setOpen(false)
  //   setTitle(); 
  //  }
};
const handleClose = () => {
  setOpen(false);
};
//   const formik = useFormik({
//     initialValues: events,
//     enableReinitialize: true,
//     validationSchema: validationSchema,
//     onSubmit: (values, { resetForm }) => {
//         const userDetails = JSON.parse(localStorage.getItem("userDetail"));
//         values.schooleId = userDetails.schoolId;
//         if (events._id) {
//             CalelnderEventsService.upadeCalelnderEvents(values).then((res) => {
//                 handleClose();
//                 getCalelnderEventsList();
//                 resetForm()
//                 alert("Calelnder Events Updated Successfully.");
//             }).catch((err) => {
//             });
//         }
//         else {
//           CalelnderEventsService.creteCalelnderEvents(values).then((res) => {
//             getCalelnderEventsList();
//                 resetForm();
//                 handleClose();
//                 alert(" Calelnder Events Added Successfully.");
//                 // props.history.push('/app/vendor');
//             })
//                 .catch((err) => {
                    
//                     alert(err.response.data.message)
//                 })
//         }

//     },
// });

  return (
    <div className='app'>
    <h1 className='text-center'>Calelnder Events</h1>
    <div className='calendar-container'>


    <FullCalendar
        // plugins={[ timeGridPlugin ]}
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        eventMouseEnter={handleMouseEnter}
        eventMouseLeave={handleMouseLeave}
       // initialView="dayGrid"
         initialView="timeGridWeek"
        // allDay={true}
        header={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
        }}
        events={eventList}
      />
       <Dialog open={open} onClose={handleClose}>
       <DialogContent >
       {title}
       </DialogContent>
       </Dialog>
    </div>
  
  </div>
);
}
export default CalelnderEvents;