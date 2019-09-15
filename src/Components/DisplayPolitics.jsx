import React, {Fragment, useEffect, useState} from 'react';
import Cards from './Cards';
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

  const [isLoaded, setIsLoaded] = useState(false);
  const [deputes, setDeputes] = useState([]);
  const [senateurs, setSenateurs] = useState([]);
  const [error, setError] = useState(null);
  // let politics = {
  //   deputes: [],
  //   senateurs: []
  // }

  useEffect(() => {
    fetchDeputes();
    fetchSenateurs();
  }, []);

  // const filterPolitics = (deputes, senateurs) => {
  //   politics = {
  //     deputes: deputes.filter(person => person.depute.nom_circo === departement),
  //     senateurs: senateurs.filter(person => person.senateur.nom_circo === departement)
  //   }
  // }
  
  return (
    <Fragment>
    {/* {() => filterPolitics(deputes, senateurs)} */}
      <Cards
        politics={{
          deputes: deputes.filter(person => person.depute.nom_circo === departement),
          senateurs: senateurs.filter(person => person.senateur.nom_circo === departement)
        }}
      />
    </Fragment>
  );
}