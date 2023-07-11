import React, { useState } from "react";
import {
  LinearProgress,
  OutlinedInput,
} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem,
  TableRow, Table,
  TableHead,
  TableBody,
  TableCell
} from "@material-ui/core";
import schooleRegistration from "./Locality/Service/schooleRegistration"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import { Grid, Card, Box, Select, TextField } from "@material-ui/core";
import { useFormik } from 'formik';

import { useContext, useEffect } from 'react';
import { useTheme } from "@material-ui/styles";

import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import BigStat from "./components/BigStat/BigStat";
import { withStyles } from '@material-ui/core/styles';
import SchooleRegistrationService from "./Locality/Service/schooleRegistration";
export default function SchooleRegistration(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  var [error, setError] = useState(null);
  const [schooleRegistrationList, setSchooleRegistrationList] = useState([]);
  const [schooleRegistration, setSchooleRegistration] = useState({
    schooleName: '',
    address: '',
    city: '',
    pincode: '',
    selectCountry: '',
    name: '',
    email: '',
    mobileNumber: '',
    schooleEmail: '',
    schooleContact: '',
    password: '',
    subscription: '',
  });

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const validationSchema = Yup.object().shape({
    schooleName: Yup.string().required('schoole Name  is required'),
     address: Yup.string().required('address is required'),
    city: Yup.string().required('city is required'),
    pincode: Yup.string().required('pin code is required')
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, 'Must be exactly 6 digits')
      .max(6, 'Must be exactly 6 digits'),
    selectCountry: Yup.string().required('selectCountry is required'),
    name: Yup.string().required('name is required'),
    email: Yup.string().required('email is required'),
    mobileNumber: Yup.string().required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits'),
    schooleEmail: Yup.string()
      .required('schoole Email is required'),
    schooleContact: Yup.string().required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits'),
    password: Yup.string().required('password is required'),
     subscription: Yup.string(),
  });
  const getSchooleRegistrationList = () => {
    SchooleRegistrationService.getAllSchooleRegistration().then((res) => {
      setSchooleRegistrationList(res);
    }).catch((err) => {
      setError(err.message);
    });
  }
  // onSubmitHandler = (e) => {
  //   e.preventDefault();
  //  this.props.history.push('/login')
  // }
  const formik = useFormik({
    initialValues:  schooleRegistration,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      SchooleRegistrationService.creteSchooleRegistration(values).then((res) => {
        debugger
        alert(" Registration Successfully.");
        props.history.push('/montessori/login');
      })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
  });


  return (

    <>
      <Card sx={{ maxWidth: 345 }}>
        <Box   >
          <div style={{ marginLeft: "7%" }}>
            <form onSubmit={formik.handleSubmit} >
              <Grid container spacing={2} columns={12} >
                <Grid item xs={12}>
                  <PageTitle InputProps={{ style: { color: '#10b680' } }} title=" School Registration" ></PageTitle>
                </Grid>
                <Grid item xs={6}>
                  <TextField InputProps={{ style: { width: 370 } }}
                  autoFocus
                    margin="dense"
                    id="schooleName"
                    name="schooleName"
                    label="Name Of The School"
                    type="text"
                    variant="standard"
                    value={formik.values.schooleName}
                    onChange={formik.handleChange}
                    error={formik.touched.schooleName && Boolean(formik.errors.schooleName)}
                    helperText={formik.touched.schooleName && formik.errors.schooleName}
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: '30px' }}>
                  <span style={{ fontSize: '17px', color: 'rgb(16 182 128)' }} >Address:</span>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    InputProps={{ style: { width: 370 } }}
                    margin="dense"
                    id="address"
                    name="address"
                    placeholder="Door/Flat/Apartment Name."
                    label="address "
                    type="text"
                    variant="standard"
                    value={formik.values.address}

                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                  />



                </Grid>
                <Grid item xs={6}>
                  <TextField
                    InputProps={{ style: { width: 370 } }}           
                    margin="dense"
                    id="city"
                    name="city"
                    label="City "
                    type="text"
                    variant="standard"
                    value={formik.values.city}

                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    InputProps={{ style: { width: 370 } }}
                    margin="dense"
                    id="pincode"
                    name="pincode"
                    label="Pin Code"
                    type="text"
                    variant="standard"
                    value={formik.values.pincode}

                    onChange={formik.handleChange}
                    error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                    helperText={formik.touched.pincode && formik.errors.pincode}
                  />
                </Grid>


                <Grid item xs={6} >
                  <div style={{ width: 370 }}>
                    <FormControl className={classes.formControl}
                      fullWidth="true" >
                      <InputLabel id="demo-simple-select-label">Select country</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="selectCountry"
                        name="selectCountry"

                        label="selectCountry"

                        onChange={formik.handleChange}
                        value={formik.values.selectCountry}
                        error={formik.touched.selectCountry && Boolean(formik.errors.selectCountry)}
                        helperText={formik.touched.selectCountry && formik.errors.selectCountry}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>United States</MenuItem>
                        <MenuItem value={2}>United Kingdom</MenuItem>
                        <MenuItem value={3}>Australia</MenuItem>
                        <MenuItem value={4}>India</MenuItem>
                        <MenuItem value={5}>Finland</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '30px' }}>
                  <span style={{ fontSize: '17px', color: 'rgb(16 182 128)' }} >Contact Details:</span>
                </Grid>
                <Grid item xs={6}>

                  <TextField
                    InputProps={{ style: { width: 370 } }}
                    
                    margin="dense"
                    id="name"
                    name="name"
                    label="Full Name"
                    type="Full Name"
                    variant="standard"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={6}>

                  <TextField
                    InputProps={{ style: { width: 370 } }}
                    
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email ID"
                    type="Email ID"
                    variant="standard"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    InputProps={{ style: { width: 370 } }}
                    
                    margin="dense"
                    id="mobileNumber"
                    name="mobileNumber"
                    label="Mobile Number"
                    type="Mobile Number"
                    variant="standard"
                    value={formik.values.mobileNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                    helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                  />
                </Grid>
                <Grid item xs={6}>

                  <TextField
                    InputProps={{ style: { width: 370 } }}
                    
                    margin="dense"
                    id="schooleEmail"
                    name="schooleEmail"
                    label="School Email "
                    type="Schoole Email"
                    variant="standard"
                    value={formik.values.schooleEmail}
                    onChange={formik.handleChange}
                    error={formik.touched.schooleEmail && Boolean(formik.errors.schooleEmail)}
                    helperText={formik.touched.schooleEmail && formik.errors.schooleEmail}
                  />
                </Grid>
                <Grid item xs={6}>

                  <TextField
                    InputProps={{ style: { width: 370 } }}
                    
                    margin="dense"
                    id="schooleContact  "
                    name="schooleContact"
                    label="School contact number   "
                    type="Schoole contact number "
                    variant="standard"
                    value={formik.values.schooleContact}

                    onChange={formik.handleChange}
                    error={formik.touched.schooleContact && Boolean(formik.errors.schooleContact)}
                    helperText={formik.touched.schooleContact && formik.errors.schooleContact}
                  />
                </Grid>

                <Grid item xs={6}>

                  <TextField
                    id="password"
                    InputProps={{ style: { width: 370 } }}
                    margin="normal"
                    label=" Set Password  "
                    // placeholder="Password"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" >Avail trail subscription </FormLabel>
                    <RadioGroup aria-label="subscription" name="subscription"  margin="dense"
                    id="subscription  "  type="radio "
                    variant="standard"
                    value={formik.values.subscription}
                    onChange={formik.handleChange}
                    error={formik.touched.subscription && Boolean(formik.errors.subscription)}
                    helperText={formik.touched.subscription && formik.errors.subscription}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />

                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <div style={{ textAlign: 'right', margin: '29px' }}>
                <Button style={{ backgroundColor: 'rgb(48 135 91)', color: 'white' }} type="submit" variant="contained" >Submit</Button>
              </div>

            </form>
          </div>
        </Box>

      </Card>


    </>
  );
}


