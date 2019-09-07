import React, {Fragment} from 'react';
import Cards from './Cards';
// import Grid from '@material-ui/core/Grid';

export default function DisplayPolitics({departement}) {

  return (
    <Fragment>
      <Cards departement={departement}/>
    </Fragment>
  );
}