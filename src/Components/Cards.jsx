import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

const fetchData = (thisApp) => {
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

class Cards extends Component {
  constructor(props) {
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          items: []
      };
  }
  componentDidMount () {
      fetchData(this);
  }

  render() {
  const { items, isLoaded } = this.state;
  const classes = {
    card: {
      display: 'flex',
    },
    cardDetails: {
      flex: 1,
    },
    cardMedia: {
      width: 160,
    },
  }



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
                <Hidden xsDown>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                </Hidden>
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
