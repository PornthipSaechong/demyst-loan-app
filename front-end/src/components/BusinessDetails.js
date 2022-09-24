import React, { Component } from 'react';

export class BusinessDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: null,
      items: [],
      business: "",
      businesses: [],
      providers: [],
      provider: ""
    };
  }

  componentDidMount = () => {
    // initialize app
    this.setState({ isLoaded: false })
    fetch("http://localhost:5000/v1/users/username/business")
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            isLoaded: true,
            businesses: result.data,
            business: result.data[0].id
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    fetch("http://localhost:5000/v1/users/username/providers")
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            isLoaded: true,
            providers: result.data,
            provider: result.data[0].id
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
    e.preventDefault();

    const {business, businesses, provider, providers} = this.state
    
    const selectedBusiness = businesses.filter(b => b.id === business)
    const selectedProvider = providers.filter(p => p.id === provider)
    this.props.saveData('business')(selectedBusiness[0])
    this.props.saveData('provider')(selectedProvider[0])
    this.props.nextStep();
  };

  handleState = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { handleChange } = this.props;
    const { error, isLoaded, businesses, providers } = this.state;

    
    if (error) {
      return <div>Error: Not able to initialize</div>;
    } else if (isLoaded === false) {
      return <div>Loading...</div>;
    } else {
      return (
        <form id="form">
          <fieldset>
            <h2>Enter Business Details</h2>
            <label>
              <p>Available Business</p>
              <select onChange={this.handleState('business')}>{
                  businesses.map(({ id, name }) =>
                  <option key={id} value={id}>{name}</option>)
              }</select>

            </label>
            <label>
              <p>Available Providers</p>
              <select onChange={this.handleState('provider')}>{
                providers.map(({ id, name }) =>
                  <option key={id} value={id}>{name}</option>)
              }</select>
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