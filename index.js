'use strict';

const ApiAiApp = require('actions-on-google').ApiAiApp

const WELCOME_INTENT = 'input.welcome'; //this is the name rom the API.AI intent. check the API.AI event console.

exports.silicon = (req, res) => {
  const app = new ApiAiApp({ request: req, response: res});
  function welcomeIntent(app){
    app.ask('Welcome to Silicon. Please say your zip code or city to continue.')
    return
  }

  
  let actionMap = new Map();
  actionMap.set(WELCOME_INTENT, welcomeIntent)
  app.handleRequest(actionMap);
}
