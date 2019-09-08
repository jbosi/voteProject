import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';

// const fetchDetailedInfo = (thisApp, slug) => {
//   fetch('https://www.nosdeputes.fr/' + slug + '/json')
//   .then(result=>result.json())
//   .then(result=> {
//       thisApp.setState({
//           isLoaded: true,
//           detailedInfo: result
//       });
//   },
//   (error) => {
//       thisApp.setState({
//           isLoaded: true,
//           error
//       });
//     }
//   )
// };

// const classes =  {
//   card: {
//     display: 'flex',
//   },
//   cardDetails: {
//     flex: 1,
//   },
//   cardMedia: {
//     width: 160,
//   },
// };

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
}));

export default function Cards({departement}) {
  const classes = useStyles();  

  useEffect(() => {
      fetchParlementaires();
  });

  const fetchParlementaires = () => {
    fetch('https://www.nosdeputes.fr/deputes/enmandat/json')
    .then(result=>result.json())
    .then(result=> {
      setIsLoaded(true);
      setItems(result.deputes);
    },
    (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

    return (
      <Grid container spacing={4} className={classes.cardGrid}>
        {items.filter(person => person.depute.nom_circo === departement)
        .map(person => {
          return (
            <Grid item key={person.depute.id} xs={12} md={6}>
              <CardActionArea component="a" href="#">
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography component="h2" variant="h5">
                        {person.depute.nom}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {person.depute.nom_circo}
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        {person.depute.parti_ratt_financier}
                      </Typography>
                    </CardContent>
                  </div>
                  <CardMedia
                    className={classes.cardMedia}
                    image= {"https://www.nosdeputes.fr/depute/photo/" + person.depute.slug}
                    title={person.depute.nom}
                  />
                </Card>
              </CardActionArea>
            </Grid>
          )
        })}
      </Grid>
    )
  }