// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react';
import ContactForm from './ContactForm';
// eslint-disable-next-line no-unused-vars
import { Row, Icon, Form, Button, Input } from 'antd';

const Contact = (props) => {
  return (
    <Fragment>
      <ContactForm/>
      <h2>
        Pour toute question ou demande d’information
        vous pouvez nous contacter à l’adresse : <em>contact@omni.community</em>
      </h2>
      <h2>
        N’hésitez-pas à nous suivre sur les réseaux sociaux !
      </h2>
      <br/>
      <Row>
        <a href='https://www.youtube.com/channel/UCpj81IQ6wwH_fjZlR3Vzfpw'><Icon type='youtube' theme='filled'/></a>
        <a href='https://www.linkedin.com/company/omni-community/'><Icon type='linkedin' theme='filled'/></a>
        <a href='https://www.facebook.com/Omni-Faire-de-la-trottinette-%C3%A9lectrique-en-fauteuil-roulant-736084190105280/'><Icon type='facebook' theme='filled'/></a>
        <a href='https://twitter.com/Omni_community'><Icon type='twitter' theme='outlined'/></a>
        <a href='https://www.instagram.com/omni.community/'><Icon type='instagram' theme='filled'/></a>
      </Row>
    </Fragment>
  )
}

export default Contact
