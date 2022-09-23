import React, { Component } from 'react';

export class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: null,
      items: [],
      profit: 0,
      assetsValue: 0
    };
  }
  continue = e => {
    e.preventDefault();
    this.props.nextStep();

    const {profit, assetsValue} = this.state
    console.log(this.state.profit, this.state.assetsValue)
    console.log('calling backend api with', profit, assetsValue)
    
    fetch("https://dummyjson.com/products/1")
      .then(res => res.json())
      .then(
        (result) => {

          const isApproved = true
          this.setState({
            isLoaded: true,
            // items: result.items
          });
          if (isApproved) {
            this.props.setSuccessCase();
          } else{
            this.props.setFailureCase();
          }
          
        },
        
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleState = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { values, handleChange } = this.props;
    const balanceSheet = values.balanceSheet
    balanceSheet.sort((a,b) => {
      if (a.month < b.month) {
        return -1
      } else if (a.month > b.month) {
        return 1
      } else {
        return 0
      }
    })
    const profit = balanceSheet.reduce((total,val) => total + val.profitOrLoss, 0)
    const assetsValue = balanceSheet.reduce((total, val) => total + val.assetsValue, 0)

    this.setState({ profit, assetsValue});

    return (

      <form id="form">

        <fieldset>
          <h2>Review Balance Sheet</h2>

          <p>Business Name: <b>{values.businessName}</b></p>
          <p>Year established: <b>{values.businessYear}</b></p>
          <p>Loan Amount: <b>{values.loanAmount}</b></p>
          <table >
            <thead>
              <tr>
                <th>Year</th>
                <th>Month</th>
                <th>Profit Or Loss</th>
                <th>Assets Value</th>
              </tr>
            </thead>            
            <tbody>

            {balanceSheet.map(d => {
              return <tr>
                <td>{d.year}</td>
                <td>{d.month}</td>
                <td>{d.profitOrLoss}</td>
                <td>{d.assetsValue}</td>
              </tr>
            })}
            <tr>
              <td><b>Total</b></td>
              <td> </td>
              <td>{profit}</td>
              <td>{assetsValue}</td>
            </tr>
            </tbody>
          </table>
          <button action="submit" onClick={this.back}>Back</button>
          <button action="submit" onClick={this.continue}>Apply</button>
          
        </fieldset>
      </form>
    );
  }
}

export default Review;