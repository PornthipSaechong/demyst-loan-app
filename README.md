# Demyst Loan Application

### Setup

1. Make sure that you have docker installed (https://docs.docker.com/get-docker/)
2. Run start.sh in your terminal - wait for docker to spin up (there are 5 containers in total)
3. Navigate to localhost:3000 in your browser

### Project structure

This project is devided into 3 parts

- front-end (using Reactjs)
- back-end (using Expressjs)
- third-party (Expressjs)

## Front-end

Bootstrapped from (https://reactjs.org/docs/create-a-new-react-app.html)
Running on port 3000

Designed as step by step form.
1. Step 1: User select business and providers, application assume that user has logged in and is viewing his available business. Currently only XERO and MYOB is available.
2. Step 2: User view balnace sheet displayed
3. Step 3: User Confirm the selection and result is returned to the user

## Back-end

Using express js
Running on port 5000

Project is structed using Model-Routes-Controllers-Services structure
Added api validation with swagger files
Model is mocked as static files

Backend contains endpoints for 3 services:
1. Users
  - GET /v1/users/{username}/business - return all businesses belonging to this user
  - GET /v1/users/{username}/providers - return all providers that we are integrated with
2. Accounts
  - GET /v1/accounts/balanceSheet?businessName=business1&provider=XERO 
    - return balance sheet of this business from the given provider
    - request is made to third-party again (profit and asset are not taken from front-end)
3. Decision
  - GET /v1/loan/approve - return response from decision engine

We can potentially split these services up into individual micro-service

## Third-party

Simple express apps to mock third-party api response
Running on port 5001, 5002, 5003

1. Xero
  - GET /xero/balanceSheet?businessName=business1&year=2022 - return balance sheet of a given year
2. MYOB
  - GET /myob/balanceSheet?businessName=business1&year=2022 - return balance sheet of a given year
3. Decision
  - POST /approve?year=2022&businessName=business1&profitOrLoss=0&preAssessment=1 - approve or reject the application



