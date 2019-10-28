import React, {Fragment} from 'react';
import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import BackgroundImage from '../Images/VoteImageBackground.jpg';
import SelectPlaces from './SelectPlace'
import DisplayPolitics from '../Components/DisplayPolitics'
import theme from './../theme'
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'center',
    overflowX: 'auto',
  },
  landingText: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  toolbarLink: {
    padding: '8px 35px 8px 35px',
    // color: '#636363', // TODO modify the theme
    flexShrink: 0,
  },
  rightUserIcon: {
    position: 'absolute',
    // color: '#636363',
    right: '5px',
  },
  backgroundImage: {
    height: 'auto',
    width: '100%',
    opacity: '0.7',
    'min-height': '80vh',
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
  politicsContent: {
    'margin-top': '70px',
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  noPadding: {
    padding: 0,
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
    marginTop: theme.spacing(8),
    padding: theme.spacing(2, 0),
  },
}));

const sections = [
  {
    label: 'Home',
    pathname: '/'
  },
  {
    label: 'Parlementaires',
    pathname: '/parlamantarians'
  },
  {
    label: 'Elir',
    pathname: '/'
  },
  {
    label: 'Objectifs',
    pathname: '/objectives'
  },
  {
    label: 'Plus d\'infos',
    pathname: '/infos'
  },
];

const social = ['GitHub', 'Twitter', 'Facebook'];


export default function Layout() {
  const classes = useStyles();
  // const [showPolitics, setShowPolitics] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [departement, setDepartement] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

   return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Container spacing={4} maxWidth='xl' className={classes.noPadding}>
        <Toolbar component='nav' variant='regular' disableGutters={true} className={classes.toolbarSecondary}>
          {sections.map(section => (
            <Link
              color='inherit'
              noWrap
              key={section.label}
              variant='body2'
              href='#'
              className={classes.toolbarLink}
            >
              {section.label.toUpperCase()}
            </Link>
          ))}
          <div className={classes.rightUserIcon}>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
        </Toolbar>
        <main>
          <Grid container>
              <Grid item md={6}>
              <img
                className={classes.backgroundImage}
                src={BackgroundImage}
                alt='background'
              />
            {/* </Grid> */}
          </Grid>
            <Grid item md={6}>
              <div className={classes.landingText}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography variant='h4' color='inherit' gutterBottom>
                    Difficile de choisir ses parlementaires ?
                  </Typography>
                  <Typography variant='body1' color='inherit' paragraph>
                    Elir.io a pour mission de vous aider dans vos choix en vous fournissant quelques indicateurs afin de vous permettre de mieux les connaitre.
                  </Typography>
                </div>
                {/* Select autocomplete */}
                <Grid item xs={12} sm className={classes.landingGrid}>
                  <Grid item xs container direction='column' spacing={2}>
                    <SelectPlaces
                      setDepartement={setDepartement}
                    />
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item md={12} className={classes.politicsContent}>
              <Grid container spacing={4}>
                {departement /*&& showPolitics */&& <DisplayPolitics departement={departement}/>}
              </Grid>
            </Grid>
          </Grid>
        </main>
      </Container>
      {/* Footer */}
      <footer className={classes.footer}>
        <Container maxWidth='lg'>
        <Typography variant='h6' gutterBottom className={classes.sidebarSection}>
          Social
        </Typography>
        {social.map(network => (
          <Link display='block' variant='body1' href='#' key={network}>
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
    </MuiThemeProvider>
);
}
