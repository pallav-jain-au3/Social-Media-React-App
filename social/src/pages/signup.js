import React, { Component } from "react";
import axios from 'axios';
import {
  withStyles,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress
} from "@material-ui/core";
import {Link} from 'react-router-dom'
import PropTypes from "prop-types";

const styles = {
  form: {
    textAlign: "center"
  },
  textField: {
    margin: `10px auto 10px auto`
  },
  pageTitle: {
    margin: `10px auto 10px auto`
  },
  button: {
    marginTop: 20,
    position :'relative'
  },
  customError:{
      color :'red',
      fontSize :'0.8rem',
      marginTop : 10
  },
  progress :{
      position:'absolute'
  }
}

export class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword :"",
      handle:"",
      errors: {},
      loading: false
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
  this.setState({
      loading : true
  })
   let newUserData = {
       email:this.state.email,
       password: this.state.password,
       confirmPassword: this.state.confirmPassword,
       handle: this.state.handle,
   }
 
   axios.post('https://us-central1-social-media-7f318.cloudfunctions.net/api/signup', newUserData)
   .then(res =>{
       console.log("res",res.data)
       localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`)
       this.setState({
           loading:false
       })
       this.props.history.push('/')

   })
   .catch(err => {
       console.error(err)
       this.setState({
           errors :err.response.data,
           loading : false
       })
       return;
   })
   }
  render() {
    const { classes } = this.props;
    const {errors, loading} = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item m>
          <Typography variant="h3" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
              id="email"
              label="Email"
              helperText = {errors.email}
              error = {errors.email ? true : false}
              className={classes.textField}
              fullWidth
            />
            <TextField
              name="password"
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
              id="password"
              label="Password"
              helperText = {errors.password}
              error = {errors.password ? true : false}
              className={classes.textField}
              fullWidth
            />
            <TextField
              name="confirmPassword"
              type="password"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
              id="confirmPassword"
              label="Confirm Password"
              helperText = {errors.confirmPassword}
              error = {errors.confirmPassword ? true : false}
              className={classes.textField}
              fullWidth
            />
            <TextField
              name="handle"
              type="handle"
              onChange={this.handleChange}
              value={this.state.handle}
              id="handle"
              label="handle"
              helperText = {errors.handle}
              error = {errors.handle ? true : false}
              className={classes.textField}
              fullWidth
            />
            
            {errors.general && (
                <Typography variant = "body2" className = {classes.customError}>{errors.general}</Typography> 
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled = {loading}
            >
              Signup
              {loading && (
                  <CircularProgress className = {classes.progress} size = {30} />
              )}
            </Button>
            <br />
            <small>Aready have an account ? login  <Link to = '/login'>here</Link></small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
signup.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(signup);
