import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ValidateButton({setShowPolitics}) {
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" color="primary" className={classes.button} onClick={() => setShowPolitics(true)}>
        Validate
        {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
        {/* <CheckIcon/> */}
      </Button>
    </div>
  );
}

ValidateButton.propTypes = {
  setShowPolitics: PropTypes.func,
}