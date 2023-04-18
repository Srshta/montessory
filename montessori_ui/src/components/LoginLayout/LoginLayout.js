import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import Layout from "../Layout/Layout"
import classnames from "classnames";
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
// import Tables from "../../pages/tables";

import Icons from "../../pages/icons";
import Charts from "../../pages/charts";

// context
import { useLayoutState } from "../../context/LayoutContext";
import { Category } from "@material-ui/icons";
import Login from "../../pages/login/Login";
import LoginHeader from "../LoginHeader/LoginHeader";
import SchoolRegistration from "../../pages/dashboard/SchoolRegistration";

function LoginLayout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
        <LoginHeader history={props.history} />
          
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
             
               <Route
                exact
                path="/"
                render={() => <Redirect to="/montessori/schoolregistration" />}
              />  
              <Route path="/montessori/schoolregistration" component={SchoolRegistration} />
              <Route path="/montessori/login" component={Login} />

              <Route path="/montessori/dashboard" component={Layout} />
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

export default withRouter(LoginLayout);
