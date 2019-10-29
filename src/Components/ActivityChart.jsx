import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Doughnut} from 'react-chartjs-2';


const useStyles = makeStyles(theme => ({
  stickyChart: {
    position: 'sticky',
    top: '30px',
  },
}));


export default function ActivityChart({politician, participation}) {
  const classes = useStyles();

  const data = {
      labels: [
        'Présence',
        'Absence'
      ],
      datasets: [{
        data: [participation[0] ? participation[0].depute.semaines_presence : 0, participation[0] ? 42 - participation[0].depute.semaines_presence : 42],
        backgroundColor: [
          '#F69F9C',
          'rgba(0,0,0,0)',
          ],
          hoverBackgroundColor: [
          '#ADBCCA',
          '#DDDDDD',
        ]
      }]
  }
  
    return (
      <div className={classes.stickyChart}>
          <Doughnut data={data} height={90}/>
          <div>
            <span>Nombre de Mandats : </span>
            <span>{participation[0] ? participation[0].depute.nb_mandats : 0}</span>
          </div>
          <div>
            <span>Amendements signés : </span>
            <span>{participation[0] ? participation[0].depute.amendements_signes : 0}</span>
          </div>
          <div>
            <span>Interventions dans l'hemicycle : </span>
            <span>{participation[0] ? participation[0].depute.hemicycle_interventions : 0}</span>
          </div>
          
      </div>
    )
  }