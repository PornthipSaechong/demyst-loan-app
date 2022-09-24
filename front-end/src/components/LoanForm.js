import React from 'react'
import BusinessDetails from './BusinessDetails.js'
import Review from './Review.js'
import Success from './Success.js'
import Failure from './Failure.js'

class LoanForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      business: {},
      loanAmount: 0,
      balanceSheet: [],
      provider: {},
      approvalRate: 0
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
    this.setState({ [input]: data });
  }

  setSuccessCase = () => {
    this.setState({
      step: 3
    });
  }

  setFailureCase = () => {
    this.setState({
      step: 4
    });
  }


  render() {
    const { step } = this.state;
    const { business, provider, balanceSheet, loanAmount, approvalRate } = this.state;
    const values = { business, provider, balanceSheet, loanAmount, approvalRate };

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
          <Review
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            saveData={this.saveData}
            values={values}
            setSuccessCase={this.setSuccessCase}
            setFailureCase={this.setFailureCase}
          />
        );
      case 3:
        return <Success values={values} />;
      case 4:
        return <Failure/>;
      default:
        (console.log('This is a multi-step form built with React.'))
    }
  }
}

export default LoanForm
