import React, { Component } from 'react';

export class Success extends Component {

  continue = e => {
    e.preventDefault();
  };

  render() {

    return (
      <form id="form">
        <fieldset>
          <h2>Congratulation your load has been approved!</h2>
        </fieldset>
      </form>
    );
    
    
    
  }
}

export default Success;