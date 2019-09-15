import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {plotActivity} from '../js/plotActivity'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  cardMargins: {
    margin: '0 0 15px 0',
  },
}));

export default function ActivityCharts({politician}) {
  const classes = useStyles();  

    return (
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <div id={politician.slug}/>
          {plotActivity(politician, politician.slug)}
        </Grid>
        <Grid item/>
      </Grid>
    )
  }