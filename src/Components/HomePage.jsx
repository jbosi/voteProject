import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
// import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import BackgroundImage from '../Images/VoteImageBackground.jpg';
import SelectPlaces from './SelectPlace'
// import ValidateButton from '../Components/ValidateButton'
import DisplayPolitics from '../Components/DisplayPolitics'

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(' + BackgroundImage + ')',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  landingGrid: {
    margin: 'auto',
    'max-width': '500px',

  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  sources: {
    marginTop: theme.spacing(3),    
    marginBottom: theme.spacing(3),    
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(2, 0),
  },
}));

const sections = [
  'Culture',
  'Business',
  'Politics',
];

const social = ['GitHub', 'Twitter', 'Facebook'];

export default function Layout() {
  const classes = useStyles();
  // const [showPolitics, setShowPolitics] = React.useState(null);
  const [departement, setDepartement] = React.useState(null);
   return (
    <Fragment>
      <CssBaseline />
      <Container spacing={4} maxWidth="xl">
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          {sections.map(section => (
            <Link
              color="inherit"
              noWrap
              key={section}
              variant="body2"
              href="#"
              className={classes.toolbarLink}
            >
              {section}
            </Link>
          ))}
        </Toolbar>
        <main>
          {/* Main featured post */}
          <Paper className={classes.mainFeaturedPost}>
            {/* Increase the priority of the hero background image */}
            {
              <img
                style={{ display: 'none' }}
                src={BackgroundImage}
                alt="background"
              />
            }
            <div className={classes.overlay} />
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography component="h2" variant="h3" color="inherit" gutterBottom>
                    VOTE
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    Vue rapide des politiques ainsi que de leur activité par département
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
          {/* End main featured post */}
          {/* Select autocomplete */}
          <Grid item xs={12} sm className={classes.landingGrid}>
            <Grid item xs container direction="column" spacing={2}>
              <SelectPlaces
                setDepartement={setDepartement}
              />
            </Grid>
            {/* <ValidateButton
              setShowPolitics={setShowPolitics}
            /> */}
          </Grid>
          {/* Sub featured posts */}
          <Grid container spacing={4}>
            {departement /*&& showPolitics */&& <DisplayPolitics departement={departement}/>}
          </Grid>
          {/* End sub featured posts */}
          <Grid container spacing={5} className={classes.mainGrid}>
            {/* Main content */}
            <Grid item xs={12} md={8}>
            </Grid>
            {/* End main content */}
          </Grid>
        </main>
      </Container>
      {/* Footer */}
      <footer className={classes.footer}>
        <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
          Social
        </Typography>
        {social.map(network => (
          <Link display="block" variant="body1" href="#" key={network}>
            {network}
          </Link>
        ))}
        <Divider className={classes.sources}/>
        <Typography>
        Sources : NosDéputés.fr / NosSénateurs.fr
        </Typography>
        </Container>
      </footer>
      {/* End footer */}
    </Fragment>
);
}
