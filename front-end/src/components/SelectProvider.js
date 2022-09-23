import React, { Component } from 'react';

export class SelectProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: null,
      items: [],
      provider: props.values.providers[0].v,
      balanceSheet: {}
    };
  }
  continue = e => {
    e.preventDefault();
    this.setState({ isLoaded: false })

    const provider = this.state['provider']
    console.log('calling provider', provider)
    fetch("https://dummyjson.com/products/1")
      .then(res => res.json())
      .then(
        (result) => {
          
          const balanceSheet = [
            {
              "year": 2020,
              "month": 12,
              "profitOrLoss": 250000,
              "assetsValue": 1234
            },
            {
              "year": 2020,
              "month": 11,
              "profitOrLoss": 1150,
              "assetsValue": 5789
            },
            {
              "year": 2020,
              "month": 10,
              "profitOrLoss": 2500,
              "assetsValue": 22345
            },
            {
              "year": 2020,
              "month": 9,
              "profitOrLoss": -187000,
              "assetsValue": 223452
            }
          ]
          this.setState({
            isLoaded: true,
            // items: result.items
          });
          this.props.saveData('balanceSheet')(balanceSheet)
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
    
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleState = input => e => {
    this.setState({ [input]: e.target.value });
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

            <h2>Select Providers</h2>

            <p>Business Name: <b>{values.businessName}</b></p>
            <p>Year established: <b>{values.businessYear}</b></p>
            <p>Loan Amount: <b>{values.loanAmount}</b></p>

            <label>
              <p>Available Providers</p>
              <select onChange={this.handleState('provider')}>{
                values.providers.map(({ k, v }) =>
                  <option key={k}>{v}</option>)
              }</select>
            </label>
            <br></br>
            <button action="submit" onClick={this.back}>Back</button>
            <button action="submit" onClick={this.continue}>Confirm</button>
            
          </fieldset>
        </form>
      );
    }
  }
}

export default SelectProvider;