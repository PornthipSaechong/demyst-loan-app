import React from 'react'
import BusinessDetails from './BusinessDetails.js'
import SelectProvider from './SelectProvider.js'
import Review from './Review.js'
import Success from './Success.js'
import Failure from './Failure.js'

class LoanForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      businessName: '',
      businessYear: '',
      loanAmount: '',
      balanceSheet: [],
      isApproved: false
    };
  };
  

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  // Handle fields from api
  saveData = input => data => {
    console.log(input,data)
    this.setState({ [input]: data });
  }

  setSuccessCase = () => {
    this.setState({
      step: 4
    });
  }

  setFailureCase = () => {
    this.setState({
      step: 5
    });
  }


  render() {
    const { step } = this.state;
    const { businessName, businessYear, providers, balanceSheet, loanAmount, isApproved } = this.state;
    const values = { businessName, businessYear, providers, balanceSheet, loanAmount, isApproved };

    switch (step) {
      case 1:
        return (
          <BusinessDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            saveData={this.saveData}
            values={values}
          />
        );
      case 2:
        return (
          <SelectProvider
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            saveData={this.saveData}
            values={values}
            readState={this.readState}
          />
        );
      case 3:
        return (
          <Review
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveData={this.saveData}
            values={values}
          />
        );
      case 4:
        return <Success/>;
      case 4:
        return <Failure/>;
      default:
        (console.log('This is a multi-step form built with React.'))
    }
  }
}

export default LoanForm
