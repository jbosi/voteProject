// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react';
// eslint-disable-next-line no-unused-vars
import { Menu, Icon } from 'antd';
// eslint-disable-next-line no-unused-vars
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './Navbar.css'
import brandImage from '../Images/brand.png';

const Navbar = (props) => {
  return (
    <Fragment>
      <img src={brandImage} title='Omni handicap trottinette électrique' alt='Omni handicap trottinette électrique' className='brand'/>
      <Menu
        theme='light'
        mode='horizontal'
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key='project'>
          <AnchorLink href='#project'>LE PROJET</AnchorLink>
        </Menu.Item>
        <Menu.Item key='team'>
          <AnchorLink href='#team'>NOTRE EQUIPE</AnchorLink>
        </Menu.Item>
        <Menu.Item key='community'>
          <AnchorLink href='#community'>LA COMMUNAUTE</AnchorLink>
        </Menu.Item>
        {/* <Menu.Item key='services'>
          <AnchorLink href='#services'>NOS SERVICES</AnchorLink>
        </Menu.Item> */}
        <Menu.Item key='contact'>
          <AnchorLink href='#contact'>CONTACT</AnchorLink>
        </Menu.Item>
        <Menu.Item key='shopping-cart'>
          <Icon type='shopping-cart' className='roundedYellow'/>
        </Menu.Item>
      </Menu>
    </Fragment>
  )
}

export default Navbar
