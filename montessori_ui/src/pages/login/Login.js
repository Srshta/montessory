import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Tabs,
  Tab,
  TextField,
  Fade,Select,

} from "@material-ui/core";
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem,
  TableRow, Table,
  TableHead,
  TableBody,
  TableCell
} from "@material-ui/core";
import { loginUser } from "../../context/UserContext";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, lofginUser } from "../../context/UserContext";
import PageTitle from "../../components/PageTitle/PageTitle";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [roleValue, setRoleValue] = useState("");
  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer} >
        <img src="https://img.freepik.com/premium-photo/hands-student-boy-using-wooden-material-montessori-school_47726-6358.jpg?w=2000"
         alt="logo" className={classes.logotypeImage} style={{ width: '820px',  height: '1000px'}}/>
        {/* <Typography className={classes.logotypeText}> School Montessori </Typography> */}
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>

         <h2 style={{fontFamily: 'unset',color: '#0fb880', fontSize: '20px', fontWeight: 'revert',   
       
        }}>Welcome To School Montessori </h2>
      
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
             


            <Tab label="Login" classes={{ root: classes.tab }} />
          </Tabs>
            <React.Fragment>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :
                </Typography>
              </Fade>
              <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">Select Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Select Login"
                                name="status"
                                placeholder="Select Role"
                               value={roleValue}
                               onChange={e => setRoleValue(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'SCHOOLE'}>Admin </MenuItem>
                                <MenuItem value={'PARENT'}>Parent </MenuItem>
                                <MenuItem value={'TEACHER'}>Teacher </MenuItem>
                            </Select>
                        </FormControl>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                        roleValue
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                 
                )}
                
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Forgot Password
                </Button>
              </div>
            </React.Fragment>
         
          
        </div>
        {/* <Typography color="primary" className={classes.copyright}>
        © 2014-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">Flatlogic</a>, LLC. All rights reserved.
        </Typography> */}
      </div>
    </Grid>
  );
}

export default withRouter(Login);
