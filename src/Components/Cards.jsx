import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
// import ActivityCharts from './ActivityCharts'
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

function drawChat(div, dataset) {
  let data = {
    data: [{
      data: dataset
    }],
  }
  let options = {};
  let myChart = new Chart(div, {
    type: 'doughnut',
    data: data,
    options: options
  });
}

useEffect(() => {
  
}, []);

export default function Cards({politics}) {
  const classes = useStyles();  

    return (
      <Grid container spacing={4}>
          {politics.deputes.map(politician => {
            return (
              <Fragment>
                <Grid item xs={6}>
                  <CardActionArea component="a" href="#" className={classes.cardMargins}>
                    <Card className={classes.card}>
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
                      <CardMedia
                        className={classes.cardMedia}
                        image= {"https://www.nosdeputes.fr/depute/photo/" + politician.depute.slug}
                        title={politician.depute.nom}
                      />
                    </Card>
                  </CardActionArea>
                </Grid>
                <Grid item xs={6}>
                  {/* <ActivityCharts politician={politician.depute}/> */}
                </Grid>
              </Fragment>
            )
          })}
          {politics.senateurs.map(politician => {
            return (
              <Fragment>
                <Grid item xs={6}>              
                  <CardActionArea component="a" href="#" className={classes.cardMargins}>
                    <Card className={classes.card}>
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
                      <CardMedia
                        className={classes.cardMedia}
                        image= {"https://www.nossenateurs.fr/senateur/photo/" + politician.senateur.slug}
                        title={politician.senateur.nom}
                      />
                    </Card>
                  </CardActionArea>
                </Grid>
                <Grid item xs={6}>
                  {/* <ActivityCharts politician={politician.senateur}/> */}
                </Grid>
              </Fragment>
            )
          })}
      </Grid>
    )
  }