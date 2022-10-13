# The Movie DB

We want an App that search movies from http://themoviedb.org and shows it in a scrollable list. You can find information about the API and how to use it here: https://developers.themoviedb.org/3/getting-started/introduction

## Steps to setup the project

Here the steps to setup the local environment:

- Clone the repository from the url https://github.com/marioandreadiloreto/themoviedb.git
- Navigate to the project directory with the command `cd themoviedb`
- Add an `.env` file with the following content

  ```
  REACT_APP_BACKEND_URL=https://api.themoviedb.org/3/
  REACT_APP_API_KEY=<YOUR_API_KEY>
  ```
- Install dependencies using `yarn install`
- Run `yarn start`
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

In the project directory, you can run:

`yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`yarn lint`

Performs the linting of the whole project.

`yarn test`

Performs the unit tests.
