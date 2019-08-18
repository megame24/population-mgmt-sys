# population-mgmt-sys

[![Build Status](https://travis-ci.org/megame24/population-mgmt-sys.svg?branch=develop)](https://travis-ci.org/megame24/population-mgmt-sys)
[![Coverage Status](https://coveralls.io/repos/github/megame24/population-mgmt-sys/badge.svg?branch=develop)](https://coveralls.io/github/megame24/population-mgmt-sys?branch=develop)

The link to the API deployed to heroku: https://pop-mgmt-sys.herokuapp.com/

## Installation

Follow the steps below to setup a local development environment, make sure to have `Nodejs` installed.

1.  Clone the repository from a terminal `git clone https://github.com/megame24/population-mgmt-sys.git`.
2.  Navigate to the project directory `cd population-mgmt-sys`
3.  Run `npm install` on the terminal to install dependencies.
4.  Change `.env-sample` to `.env` and provide the necessary credentials
5.  Run `npm start` to start the application.

## Testing

Follow the steps below to test the application.

1.  Navigate to the project directory through a terminal
2.  If you haven't, install dependencies `npm install`
3.  Also, Change `.env-sample` to `.env` and provide the necessary credentials if applicable
4.  Run `npm test`

## Documentation

Postman documentation link: https://www.getpostman.com/collections/6befa46a391d28dfc2b0

  
## Api EndPoints

EndPoint                      |   Functionality
------------------------------|------------------------
POST /auth/register        |   User sign up
POST /auth/login             |   User login
POST /locations         |   Create location(requires: name, femalePopulation, malePopulation, parentId(optional))(only available to admin)
GET /locations       |   Get list of locations
PUT  /locations/:locationId         |   Update location(only available to admin)
DELETE  /locations/:locationId      |   Delete location(only available to admin)


## Licence

MIT