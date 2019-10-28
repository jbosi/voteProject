import React, {Fragment, useEffect, useState} from 'react';
import Cards from './Cards';
import Grid from '@material-ui/core/Grid';
import ActivityChart from './ActivityChart';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Grid from '@material-ui/core/Grid';

export default function DisplayPolitics({departement}) {

  const fetchDeputes = () => {
    fetch('https://www.nosdeputes.fr/deputes/enmandat/json')
    .then(result=>result.json())
    .then(result=> {
      setIsLoaded(true);
      setDeputes(result.deputes);
    },
    (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  };

  const fetchSenateurs = () => {
    fetch('https://www.nossenateurs.fr/senateurs/enmandat/json')
    .then(result=>result.json())
    .then(result=> {
      setIsLoaded(true);
      setSenateurs(result.senateurs);
    },
    (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  };

  const fetchParticipationDeputes = () => {
    fetch('https://www.nosdeputes.fr/synthese/data/json')
    .then(result=>result.json())
    .then(result=> {
      setIsLoaded(true);
      setParticipation(result.deputes);
    },
    (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [deputes, setDeputes] = useState([]);
  const [senateurs, setSenateurs] = useState([]);
  const [participation, setParticipation] = useState([]);
  const [deputeSelected, setDeputeSelected] = useState([]);

  const handleClick = (depute) => {
    setDeputeSelected(depute);
  };

  useEffect(() => {
    fetchDeputes();
    fetchSenateurs();
    fetchParticipationDeputes();
  }, []);

  const [tabValue, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Fragment>
      <Grid item xs={12}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Députes" />
          <Tab label="Sénateurs" />
        </Tabs>
      </Grid>
      <Grid item xs={6}>
      <Cards
        politics={{
          deputes: deputes.filter(person => person.depute.nom_circo === departement),
          senateurs: senateurs.filter(person => person.senateur.nom_circo === departement),
          participation: participation,
        }}
        onChange={handleClick}
        tabValue={tabValue}
      />
      </Grid>
      <Grid item xs={6}>
        {deputeSelected ?
          <ActivityChart
          politician={deputeSelected}
          participation={participation.filter(person => person.depute.id === deputeSelected.id)
          }/>
          : null}
      </Grid>
    </Fragment>
  );
}