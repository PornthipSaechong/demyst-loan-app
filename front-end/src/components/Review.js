import React, { Component } from 'react';

export class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: null,
      items: [],
      balanceSheet: []
    };
  }
  componentDidMount = () => {
    // fetching balancesheet
    this.setState({ isLoaded: false })

    const business = this.props.values.business.name
    const provider = this.props.values.provider.name

    fetch(`http://localhost:5000/v1/accounts/balanceSheet?businessName=${business}&provider=${provider}`)
      .then(res => res.json())
      .then(
        (result) => {
          const balanceSheet = result.data

          const profit = balanceSheet.reduce((total, val) => total + val.profitOrLoss, 0)
          const assetsValue = balanceSheet.reduce((total, val) => total + val.assetsValue, 0)/balanceSheet.length

          balanceSheet.sort((a,b) => {
            if (a.month > b.month) {
              return 1;
            } else if (a.month < b.month) {
              return -1;
            } else {
              return 0;
            }
          });
          this.setState({
            isLoaded: true,
            balanceSheet,
            profit,
            assetsValue
          });
          
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    
  }

  continue = e => {
    fetch(`http://localhost:5000/v1/loan/approve`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        year: `${this.props.values.business.year}`,
        businessName: this.props.values.business.name,
        provider: this.props.values.provider.name,
        loanAmount: parseInt(this.props.values.loanAmount)
      })
    })
      .then(res => res.json())
      .then(
        (result) => {

          
          this.setState({
            isLoaded: true
          });

          if (result.data.approved) {
            this.props.saveData('approvalRate')(result.data.approvalRate)
            this.props.setSuccessCase()
          } else {
            this.props.setFailureCase()
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          this.props.setFailureCase()
        }
      )
    e.preventDefault();
    this.props.nextStep();
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleState = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { values } = this.props;
    const { error, isLoaded, balanceSheet, profit, assetsValue } = this.state;   

    if (error) {
      return (
        <div>
          <div>Error: Not able to load balance sheet for the selected option</div>
          <button action="submit" onClick={this.back}>Back</button>
        </div>      
      );
    } else if (isLoaded === false) {
      return <div>Loading...</div>;
    } else {
      return (
        <form id="form">

          <fieldset>

            <h2>Review Balance Sheet</h2>

            <p>Business Name: <b>{values.business.name}</b></p>
            <p>Year established: <b>{values.business.year}</b></p>
            <p>Provider: <b>{values.provider.name}</b></p>
            <p>Loan Amount: <b>{values.loanAmount}</b></p>

            <table >
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Month</th>
                  <th>Profit Or Loss</th>
                  <th>Average Assets Value across 12 months</th>
                </tr>
              </thead>
              <tbody>

                {balanceSheet.map(d => {
                  return <tr key={d.id}>
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
}

export default Review;