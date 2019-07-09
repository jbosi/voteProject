// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react';
// eslint-disable-next-line no-unused-vars
import Card from './Card'

import Charlotte from '../Images/pp/pp1.svg';
import Robin from '../Images/pp/pp2.svg';
import Mathieu from '../Images/pp/pp3.svg';
import Noe from '../Images/pp/pp4.svg';
import Sulivan from '../Images/pp/pp5.svg';
import Mail from '../Images/pp/mail.svg';

const teamArray = [
  {
    id: 1,
    name: 'Charlotte ALAUX',
    skills: 'Marketing & Communication',
    background: 'EMLV',
    description: 'Charlotte a suivi une formation en école de commerce à l Ecole de Management Léonard de Vinci et bénéficie d une expérience de plus de 20 ans en fauteuil roulant. Elle est en charge de la communication et du développement marketing, elle apporte aussi beaucoup par son expérience utilisateur et sa compréhension du besoin.',
    imageUrl: Charlotte
  },
  {
    id: 2,
    name: 'Sulivan RICHARD',
    skills: 'Design & industrialisation',
    background: 'UTC',
    description: 'Sulivan a suivi une formation hybride d’ingénierie mécanique et de design industriel à l’Université de Technologie de Compiègne, il est responsable de l’aspect industrialisation et certification du produit. Fort de son expérience en agence de design produit, il apporte, grâce à ses talents de designer, son expertise sur le développement du produit et sur les aspects esthétique tout en réfléchissant aux procédés de fabrication et la faisabilité.',
    imageUrl: Sulivan
  },
  {
    id: 3,
    name: 'Mathieu IZAUTE',
    skills: 'R&D',
    background: 'Mines d’Albi',
    description: 'Mathieu a suivi un cursus d’ingénieur généraliste aux Mines d’Albi. Depuis tout petit Mathieu adore bricoler et il prend aujourd’hui énormément de plaisir à réaliser des prototypes rapides et rechercher des solutions techniques pour relever les défis qui se présentent à nous. Sa capacité à prototyper au plus vite la moindre idée permet d’explorer rapidement des axes de recherche.',
    imageUrl: Mathieu
  },
  {
    id: 4,
    name: 'Noé VINOT-KAHN',
    skills: 'Finances et Ventes',
    background: 'Ecole des Ponts',
    description: 'Noé a suivi une formation d’ingénieur généraliste à l’Ecole National des Ponts et Chaussées, il est président d’Omni et responsable des recherches de financements et du suivi financier de la structure. Il fait bénéficier l’équipe de ses expériences d’entreprenariat social grâce aux projets qu’il a pu développer auparavant.',
    imageUrl: Noe
  },
  {
    id: 5,
    name: 'Robin LHOMMEAU',
    skills: 'R&D',
    background: 'Arts et Métiers',
    description: 'Robin a suivi une formation d’ingénieur mécanique aux Arts et Métier, grâce à ses connaissances et à son savoir-faire il travaille de concert avec Mathieu afin rechercher et trouver de nouvelles solutions aux problèmes techniques que nous rencontrons. Grâce à ses compétences d’ingénieur mécanique il participe également au développement industriel du produit.',
    imageUrl: Robin
  },
  {
    id: 6,
    name: 'Pour nous contacter :',
    skills: 'contact@omni.community',
    background: '',
    description: '',
    imageUrl: Mail
  }
];
const Cards = () => {
  return (
    <Fragment>
      {teamArray.map(person => {
        return <Card key={person.id} person={person}/>
      })}
    </Fragment>
  )
}

export default Cards
