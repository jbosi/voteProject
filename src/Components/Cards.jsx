import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Chart from 'chart.js';

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

// function drawChart(div, dataset) {
//   let data = {
//     data: [{
//       data: dataset
//     }],
//   }
//   let options = {};
//   let myChart = new Chart(div, {
//     type: 'doughnut',
//     data: data,
//     options: options
//   });
// }


export default function Cards({politics, onChange, tabValue }) {
  const classes = useStyles();
  const handleChange = (depute) => {
    onChange(depute);
  }
  
    return (
      <Grid container spacing={4}>
          {tabValue === 0 ? politics.deputes.map(politician => {
            return (
              <Fragment key={politician.depute.slug}>
                  <CardActionArea component="a" className={classes.cardMargins} onClick={() => handleChange(politician.depute)}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image= {"https://www.nosdeputes.fr/depute/photo/" + politician.depute.slug}
                        title={politician.depute.nom}
                      />
                      <div className={classes.cardDetails}>
                        <CardContent>
                          <Typography component="h2" variant="h5">
                            {politician.depute.nom}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {politician.depute.nom_circo}
                          </Typography>
                          <Typography variant="subtitle1" paragraph>
                            {politician.depute.parti_ratt_financier}
                          </Typography>
                        </CardContent>
                      </div>
                    </Card>
                  </CardActionArea>
              </Fragment>
            )
          }) : null}
          {tabValue === 1 ?politics.senateurs.map(politician => {
            return (
              <Fragment key={politician.senateur.slug}>
                  <CardActionArea component="a" className={classes.cardMargins}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image= {"https://www.nossenateurs.fr/senateur/photo/" + politician.senateur.slug}
                        title={politician.senateur.nom}
                      />
                      <div className={classes.cardDetails}>
                        <CardContent>
                          <Typography component="h2" variant="h5">
                            {politician.senateur.nom}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {politician.senateur.nom_circo}
                          </Typography>
                          <Typography variant="subtitle1" paragraph>
                            {politician.senateur.parti_ratt_financier}
                          </Typography>
                        </CardContent>
                      </div>
                    </Card>
                  </CardActionArea>
              </Fragment>
            )
          }) : null}
      </Grid>
    )
  }