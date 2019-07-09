// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

class Card extends Component {
  constructor () {
    super()
    this.state = {
      isCardActive: false
    }
  }

  toggleClass = () => {
    const currentState = this.state.isCardActive;
    this.setState({ isCardActive: !currentState });
  };

  render () {
    return (
      <div onClick={this.toggleClass} className={'card ' + (this.state.isCardActive ? 'card-active' : null)}>
        <div style={{ backgroundImage: 'url(' + this.props.person.imageUrl + ')' }} className='profilePicture' alt=''></div>
        <h1>{this.props.person.name}</h1>
        <hr className='thick'/>
        <h1>{this.props.person.skills}</h1>
        <h1>{this.props.person.background}</h1>
        <p>{this.props.person.description}</p>
        {/* <Button className='roundedWhite' shape='round' size={'medium'}></Button> */}
      </div>
    )
  }
}

export default Card
