import React, { Component } from 'react';

export class BusinessDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: null,
      items: [],
      businessName: "",
    };
  }

  continue = e => {
    e.preventDefault();
    this.setState({ isLoaded: false })

    const businessName = this.state['businessName']
    console.log('calling businessName', businessName)
    fetch("https://dummyjson.com/products/1")
      .then(res => res.json())
      .then(
        (result) => {

          const providers = [{ 'k': 'p1', 'v': 'XERO' }, { 'k': 'p2', 'v': 'MYOB' }]
          const year = 2020
          this.setState({
            isLoaded: true,
            // items: result.items
          });
          this.props.saveData('businessYear')(2020)
          this.props.saveData('providers')(providers)
          this.props.nextStep();    
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  };

  render() {
    const { values, handleChange } = this.props;
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (isLoaded == false) {
      return <div>Loading...</div>;
    } else {
      return (
        <form id="form">
          <fieldset>
            <h2>Enter Business Details</h2>
            <label>
              <p>Business Name</p>
              <input name="name" onChange={handleChange('businessName')} />
            </label>
            <label>
              <p>Loan Amount</p>
              <input type="number" name="name" onChange={handleChange('loanAmount')} />
            </label>
            <br></br>
            <button action="submit" onClick={this.continue}>Next</button>
          </fieldset>     
        </form>
      );
    }
  }
}

export default BusinessDetails;