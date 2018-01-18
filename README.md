[![Build Status](https://img.shields.io/travis/kbromma/personal-javascript-stack.svg?style=flat-square)](https://travis-ci.org/kbromma/personal-javascript-stack)
[![Coverage Status](https://img.shields.io/coveralls/kbromma/personal-javascript-stack.svg?style=flat-square)](https://coveralls.io/github/kbromma/personal-javascript-stack?branch=master)

# Extended javascript full stack

This is a javascript stack as introduced through the tutorial [here](https://github.com/verekia/js-stack-from-scratch). 
I have also taken some aspects from [create-react-app](https://github.com/facebookincubator/create-react-app) and their subsequent package react-dev-utils, in order to improve functionality.

This can run ES6 js, and is set up to have server-side rendering.

# Javascript Stack

The current stack has many different features, and is completely open to change if one wants.
* Babel, ESlint, Flow, Jest, and Husky for testing and linting
* Express and sqlite for the backend. 
  * Nodemon and webpack-dev-server are used for developmental hot loading of both the server and the client code.
* React, Redux, React-Router, Helmet are used for the front-end and front-end state.
* Socket.io can be used and is enabled if socket's are necessary.
* For some front-end visualizing using CSS, bootstrap and jss have been added.
* For production builds, Travis and Coveralls are used.

# Extensions to the aforementioned Github repositories

I have currently added a few extra features to improve functionality for my uses.

* A start.js script was added, that allows for the automation of nodemon and webpack-dev-server, and only one console.
* [Sqlite](https://github.com/kriasoft/node-sqlite) was added that uses promises and integrates well into the current set up.

# Start-up

Clone this repository using 

`git clone https://github.com/kbromma/personal-javascript-stack.git`

Run `yarn` and you should be good to go. You can edit package.json however you like and the config/config.js file to change ports and app name/other options.

`yarn start` will run the development server.

Other scripts will come soon.

# To add:

- Build/Production .js Script
- Test .js Script


