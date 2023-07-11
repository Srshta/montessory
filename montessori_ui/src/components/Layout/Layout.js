import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import StudentRegistration from "../../pages/dashboard/StudentForm"
import AddClass from "../../pages/dashboard/AddClass";
import Teacher from "../../pages/dashboard/Teacher";
import Activity from "../../pages/dashboard/StudentActivity"
import CalenderEvents from "../../pages/dashboard/CalelnderEvents"
import CreateEvents from "../../pages/dashboard/CreateEvents"
import ActivityTabel from "../../pages/dashboard/ActivityTabel"
import SuperActivity from "../../pages/dashboard/SuperActivity"
import SubActivity from "../../pages/dashboard/SubActivity"
import ActivityExpected from "../../pages/dashboard/ActivityExpected"
import Attendence from "../../pages/dashboard/Attendence"
import StudentDetails from "../../pages/dashboard/StudentDetails"
import Reports from "../../pages/dashboard/reports"
import AgeReports from "../../pages/dashboard/AgeReports"
import SpecialObservation from "../../pages/dashboard/SpecialObservation"
import Sound from "../../pages/dashboard/Sound"
import ReportOfActivities from "../../pages/dashboard/reportofactivities"
import MovableAlphabets from "../../pages/dashboard/MovableAlphabets"
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'
// import Vendor from "../../pages/vendor";
// import VendorRegistration from "../../pages/vendor/VendorRegistration";
// import Locality from "../../pages/dashboard/Locality/Locality";
// import Categories from "../../pages/dashboard/components/Categories/Categories";
// import Menu from "../../pages/dashboard/components/Menu/Menu"
// import VendorList from "../../pages/dashboard/components/VendorList/VendorList"
// import OrderDetailes from "../../pages/dashboard/components/OrderDetailes/OrderDetailes"
// import DicountCoupon from "../../pages/dashboard/components/DiscountCoupon/DiscountCoupon";
//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard/SchoolRegistration";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
// context
import { useLayoutState } from "../../context/LayoutContext";
import { Category } from "@material-ui/icons";
import SchooRegistration from "../../pages/dashboard/SchoolRegistration";
import ActivityService from "../../pages/dashboard/Locality/Service/activityService";
function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/studentregistration/:id" component={StudentRegistration} />
              <Route path="/app/addclass" component={AddClass} />
              <Route path="/app/teacher" component={Teacher} />
              <Route path="/app/studentactivity" component={Activity} />
              <Route path="/app/activitytabel" component={ActivityTabel} />
              <Route path="/app/activityexpected" component={ActivityExpected} />
              <Route path="/app/superactivity" component={SuperActivity} />
              <Route path="/app/subactivity" component={SubActivity} />
              <Route path="/app/attendence" component={Attendence} />
              <Route path="/app/studentdetails" component={StudentDetails} />
              <Route path="/app/typography" component={Typography} />
              <Route path="/app/notifications" component={Notifications} />
              <Route path="/app/calenderevents" component={CalenderEvents} />
              <Route path="/app/createevents" component={CreateEvents} />
              <Route path="/app/agereports" component={AgeReports} />
              <Route path="/app/specialobservation" component={SpecialObservation} />
              <Route path="/app/sound" component={Sound} />
              <Route path="/app/movablealphabets" component={MovableAlphabets} />
              {/* <Route path="/app/reports" component={Reports} /> */}
              {/* <Route path="/app/vendor" component={Vendor} />
              <Route path="/app/vendorregistration/:id" component={VendorRegistration} />
              <Route path="/app/locality" component={Locality} />
              <Route path="/app/categories" component={Categories} />
              <Route path="/app/menu" component={Menu} />
              <Route path="/app/listvendor" component={VendorList} />
              <Route path="/app/orderdetailes" component={OrderDetailes} />
              <Route path="/app/discountcoupon" component={DicountCoupon} /> */}
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/reports" component={Reports} />
              <Route path="/app/reportofactivities" component={ReportOfActivities} />
              <Route path="/app/ui/reportofactivities" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
            <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              {/* <div>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/'}
                  target={'_blank'}
                  className={classes.link}
                >
                  Flatlogic
                </Link>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/about'}
                  target={'_blank'}
                  className={classes.link}
                >
                  About Us
                </Link>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/blog'}
                  target={'_blank'}
                  className={classes.link}
                >
                  Blog
                </Link>
              </div> */}
              <div>
                <Link
                  href={'https://www.facebook.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton aria-label="facebook">
                    <Icon
                      path={FacebookIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://twitter.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton aria-label="twitter">
                    <Icon
                      path={TwitterIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://github.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton
                    aria-label="github"
                    style={{marginRight: -12}}
                  >
                    <Icon
                      path={GithubIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
              </div>
            </Box>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
