import React, { Component } from 'react';

export class Success extends Component {

  continue = e => {
    e.preventDefault();
  };

  render() {
    const { values } = this.props;
    return (
      <form id="form">
        <fieldset>
          <h2 role="heading">Congratulation your load has been approved!</h2>
          <p role="sub-heading">Loan is favored to be approved {values.approvalRate}% of the requested value</p>
        </fieldset>
      </form>
    );
    
    
    
  }
}

export default Success;