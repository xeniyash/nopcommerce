# Setup your environment

Note: all commands in this README.md are for MacOS, commands for other operation systems will be provided later

TODO: Add commands for Windows and Linux  

- install brew: 

  `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`

- install node:

  `brew install node`

- install yarn:

  `brew install yarn`

- install all dependencies:

  `yarn install`

# Run tests  

  `yarn cypress`

# Reports

There are several types of reports setuped:

1. Report in HTML format: `cypress/reports/full_report.html` - this reposrt creates automatecally after each test run. For the future timestemp can be added to the report so we'll get history.

2. Cypress Dashboard: https://dashboard.cypress.io/organizations/305fc879-92ae-4762-8a76-fbe5f966a0bc/projects

  - invite to the cypress dashboard was sent to: marcelo.leite@unity3d.com 
  - cypress dashboard provides dicent amount of statistics, shuch as: Run status, Run duration, Test suite seze, Top failures, Slowest tests, Most common errors, Flaky tests
  - but it cost money :(

3. As an option we also can do integration with Test Rail tool which can provide us nice and explicit reports, so in each Jira ticket we can see test cases from Test Rail and result if those tests failed/passed. Also Test Rail provides test coverage report. Has integration with CD pipeline as well

# Postman regression testing suite

UI tests can be flaky due to many resons:

- environment issues
- connection issues
- complecated test login with a lot of redundunt steps
- etc

Functionality on a UI side can be also tested through UI API calls, as an example I've created simple postman collection with one test which is checking computers/ endpoint.
For better visibility `nopcommerce_regression_suite.postman_collection.json` should be imported into Postman app:

1. Intall postman on you machine: instructions can be found here: https://learning.postman.com/docs/getting-started/installation-and-updates/

2. Open Postman > Import > Choose file > `nopcommerce_regression_suite.postman_collection.json` and `demo.nopcommerce.com.postman_environment`

3. Go to the collection > open `computers` request > click on Tests tab

    As you can see we're verifying response_code = 200, response_time below set limit, response_body contain certain string.

4. For running tests in pipeline we're going to use newman:

- `npm install -g newman`

- run command: newman run [collection] -e [environment]

  example: 
  
  `cd postman`
  
  `newman run nopcommerce_regression_suite.postman_collection.json -e demo.nopcommerce.com.postman_environment.json`

- to get html report after each test run we need to install htmlextra: `npm install -g newman-reporter-htmlextra`

- add  `--reporters cli,htmlextra`

  example: 
  
  `cd postman/`
  
  `newman run nopcommerce_regression_suite.postman_collection.json -e demo.nopcommerce.com.postman_environment.json --reporters cli,htmlextra`

- report is in `postman/newman` folder


 


