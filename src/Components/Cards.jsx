import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';

const fetchParlementaires = (thisApp) => {
  fetch('https://www.nosdeputes.fr/deputes/enmandat/json')
  .then(result=>result.json())
  .then(result=> {
      thisApp.setState({
          isLoaded: true,
          items: result.deputes
      });
  },
  (error) => {
      thisApp.setState({
          isLoaded: true,
          error
      });
    }
  )
};

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
const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

class Cards extends Component {
  constructor(props) {
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          items: [],
          // detailedInfo: [],
      };
  }
  
  componentDidMount () {
      fetchParlementaires(this);
  }

  render() {
    const { items, isLoaded/*, detailedInfo */} = this.state;
    const classes = useStyles();

    return (
      <Fragment>
        {items.map(person => {
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
                        {person.depute.groupe_sigle}
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
      </Fragment>
    )
  }
}

export default Cards;
