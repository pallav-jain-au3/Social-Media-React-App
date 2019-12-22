import React, { Component } from 'react';
import {Grid} from '@material-ui/core';
import axios from 'axios';
import Scream from '../components/Scream'

export class home extends Component {
    state = {
        screams : null
    }
    componentDidMount(){
        axios.get('https://us-central1-social-media-7f318.cloudfunctions.net/api/screams')
        .then(res =>{
            console.log(res.data)
            this.setState({
                screams : res.data
            })
        })
        .catch(err => console.error(err))
    }
    render() {
        let recentScreamMarkup = this.state.screams ? (this.state.screams.map((scream,index) =><Scream key = {index} scream = {scream}/> ) ) : "loading...."
        return (
            
               <Grid container spacing = {10}>
               <Grid item sm = {8} xs = {12}>
               {recentScreamMarkup}
               </Grid>
               <Grid item sm = {4} xs = {12}>
               <p>profile....</p>
               </Grid>
               </Grid>
            
        )
    }
}

export default home
