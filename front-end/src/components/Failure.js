import React, { Component } from 'react';

export class Failure extends Component {

  continue = e => {
    e.preventDefault();
  };

  render() {

    return (
      <form id="form">
        <fieldset>
          <h2>Your application has been rejected.</h2>
        </fieldset>
      </form>
    );
    
    
    
  }
}

export default Failure;