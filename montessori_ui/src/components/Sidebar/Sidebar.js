import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import CategoryServices from "../../services/CategoryServices";

import {
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  HotTub as HotTub,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  SvgIconComponent as SvgIconComponent,
  CalendarToday as CalendarToday,
  AccessAlarmSharp as AccessAlarmSharp,
  Create as Create,
  SupervisedUserCircle,
  HistorySharp,
  OpenInNew,
  Spa
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
// styles
import useStyles from "./styles";
// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";
// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

let structure = [
  // { id: 0, label: "Student Registration", link: "/app/studentregistration", icon: <TypographyIcon /> },
  {
    id: 8,
    label: "Calender Events",
    link: "/app/calenderevents",
    icon: <CalendarToday />,
  },
  // { id: 1, label: "Add Age", link: "/app/addclass", icon: <TableIcon /> },
  {
    id: 2,
    label: "Teacher",
    link: "/app/teacher",
    icon: <FAQIcon />,
  },
 
  {
    id: 3,
    label: "Student Details",
    link: "/app/studentdetails",
    icon: <HotTub />,
  },
  {
    id: 4,
    label: "Attendence",
    link: "/app/attendence",
    icon: <SupportIcon />,
  },
  {
    id: 6,
    label: "Area Of Work",
    link: "/app/superactivity",
    icon: <SupervisedUserCircle />,
  },
  {
    id: 5,
    label: "List of Activities",
    link: "/app/activitytabel",
    icon: <AccessAlarmSharp />,
  },
  {
    id: 6,
    label: "Exercise ",
    link: "/app/subactivity",
    icon: <LibraryIcon />,
  },
  {
    id: 7,
    label: "Student Activity",
    link: "/app/studentactivity",
    icon: <ArrowBackIcon />,
  },
  {
    id: 8,
    label: "Weekly Plan",
    link: "/app/activityexpected",
    icon: <HistorySharp />,
  },
  {
    id: 9,
    label: "Create Events",
    link: "/app/createevents",
    icon: <Create />,
  },
  { label: "Special Observation", link: "/app/specialobservation",
  icon:<OpenInNew />},
  {
    id: 11,
    label: "Sounds",
    icon: <Spa />,
    children: [
       { label: "Sounds", link: "/app/sound" },
      { label: "Movable Alphabets", link: "/app/movablealphabets" },
     
    ],
  },
  
  //   {
  //   id: 10,
  //   label: "Sounds",
  //   link: "/app/sound",
  //   icon: <TableIcon />,
  // },
  {
    id: 11,
    label: "Reports",
    icon: <UIElementsIcon />,
    children: [
       { label: "Attendence Reports", link: "/app/reports" },
      //  { label: "Activity Reports", link: "/app/reportofactivities" },
      { label: "Age Reports", link: "/app/agereports" },
     
    ],
  },
  // { id: 5, type: "divider" },
  // { id: 6, type: "title", label: "HELP" },
  // { id: 7, label: "Library", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
  // { id: 8, label: "Support", link: "https://flatlogic.com/forum", icon: <SupportIcon /> },
  // { id: 9, label: "FAQ", link: "https://flatlogic.com/forum", icon: <FAQIcon /> },
  // { id: 10, type: "divider" },
  // { id: 11, type: "title", label: "PROJECTS" },
  // {
  //   id: 12,
  //   label: "My recent",
  //   link: "",
  //   icon: <Dot size="small" color="warning" />,
  // },
  // {
  //   id: 13,
  //   label: "Starred",
  //   link: "",
  //   icon: <Dot size="small" color="primary" />,
  // },
  // {
  //   id: 14,
  //   label: "Background",
  //   link: "",
  //   icon: <Dot size="small" color="secondary" />,
  // },
];
const teacher=[
  {
    id: 1,
    label: "Calender Events",
    link: "/app/calenderevents",
    icon: <CalendarToday />,
  },
  // {
  //   id: 2,
  //   label: "Create Events",
  //   link: "/app/createevents",
  //   icon: <Create />,
  // },
 
  {
    id: 2,
    label: "Student Details",
    link: "/app/studentdetails",
    icon: <HotTub />,
  },
  {
    id: 3,
    label: "Attendence",
    link: "/app/attendence",
    icon: <SupportIcon />,
  },
  // {
  //   id: 7,
  //   label: "Activity List",
  //   link: "/app/activitytabel",
  //   icon: <AccessAlarmSharp />,
  // },
  // {
  //   id: 8,
  //   label: "Sub Activity ",
  //   link: "/app/subactivity",
  //   icon: <LibraryIcon />,
  // },
  {
    id: 4,
    label: "Student Activity",
    link: "/app/studentactivity",
    icon: <ArrowBackIcon />,
  },
  {
    id: 5,
    label: "Weekly Plan",
    link: "/app/activityexpected",
    icon: <HistorySharp />,
  },
  {
    id: 6,
    label: "Reports",
    icon: <UIElementsIcon />,
    children: [
      { label: "Attendence Reports", link: "/app/reports" },
      { label: "Activity Reports", link: "/app/reportofactivities" },
    ],
  },

]; 
const student=[
    
  // { id: 1, label: "Add Class", link: "/app/addclass", icon: <TableIcon /> },
  // {
  //   id: 3,
  //   label: "Teacher",
  //   link: "/app/teacher",
  //   icon: <UIElementsIcon />,
  // },
];


const userDetails = localStorage.getItem("userDetail") ? JSON.parse(localStorage.getItem("userDetail")) :{};
// if(userDetails.role === 'PARENT'){
//   structure = student;
// }else 
if(userDetails && userDetails.role === 'TEACHER'){
  structure = teacher;
}
function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );
  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;
    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
