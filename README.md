# Demyst Loan Application

This web application is designed for Demyst assessment

## Setup

1. Make sure that you have docker installed (https://docs.docker.com/get-docker/)
2. Run `start.sh` in your terminal - wait for docker to spin up (there are 5 containers in total)
3. Navigate to `localhost:3000` in your browser. You should see a web form.

## Tear down
Run `stop.sh` to stop all the containers that have been started for this project

## Project structure

This project is divided into 3 parts

- front-end (using Reactjs)
- back-end (using Expressjs)
- third-party (Expressjs)

### Front-end

Front-end is created to gather information needed for loan approval. It is bootstrapped from [https://reactjs.org/docs/create-a-new-react-app.html](https://reactjs.org/docs/create-a-new-react-app.html)

Running on port 3000

Web form has the following step:
- **Step 1**: Assuming that user has logged in and is viewing his available businesses, user is prompted to select business and provider. Currently only XERO and MYOB are available as providers.
- **Step 2**: User view balance sheet populated
- **Step 3**: User Confirm the selection and result of loan application is returned to the user

In the case where data is not available to the user, error will be display and user will prompted to enter another selection.

### Back-end

Backend is created using express js as a layer to connect third party apis with front-end
Running on port 5000

Project is structed using `Model-Routes-Controllers-Services structure`

Added swagger validator as a middleware to validate the incoming requests

Model is mocked as static files

Backend contains endpoints for 3 services:
1. **Users**
  - `GET /v1/users/{username}/business` - return all businesses belonging to this user
  - `GET /v1/users/{username}/providers` - return all providers that are available to this user
2. **Accounts**
  - `GET /v1/accounts/balanceSheet?businessName=business1&provider=XERO`- return balance sheet of this business from the selected provider
3. **Decision**
  - `POST /v1/loan/approve` - return response from decision engine by internally calling third-party provider and decision engine
  body:
  ```
  {
    "year": "2020",
    "provider": "XERO",
    "loanAmount": 1,
    "businessName": "business1"
  }
  ```
    

We can potentially split these services up into individual microservice

### Third-party

Simple express apps to mock third-party api response
Running on port 5001, 5002, 5003

1. **Xero**
  - `GET /xero/balanceSheet?businessName=business1&year=2022` - return balance sheet of a given year
2. **MYOB**
  - `GET /myob/balanceSheet?businessName=business1&year=2022` - return balance sheet of a given year
3. **Decision**
  - `POST /approve?year=2022&businessName=business1&profitOrLoss=0&preAssessment=1` - approve or reject the application




