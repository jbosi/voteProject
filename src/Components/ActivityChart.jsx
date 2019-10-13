import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Doughnut} from 'react-chartjs-2';


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


export default function ActivityChart({politician}) {
  const data = {
      labels: [
        'Red',
        'Green',
        'Yellow'
      ],
      datasets: [{
        data: [10, 20, 50],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ],
          hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }]
  }
  
    return (
      <div id={'test'}>
          <Doughnut data={data}/>
      </div>
    )
  }