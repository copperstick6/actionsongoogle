'use strict';

const ApiAiApp = require('actions-on-google').ApiAiApp

const WELCOME_INTENT = 'input.welcome'; //this is the name rom the API.AI intent. check the API.AI event console.
const ZIP_INTENT = 'input.zip'
exports.silicon = (req, res) => {
  const app = new ApiAiApp({ request: req, response: res});
  function welcomeIntent(app){
    app.ask('Welcome to Silicon. Please say your zip code or city to continue.')
    return
  }

  function zipIntent(app){
    let zipCode = app.getArgument('zipVal')
    let city = app.getArgument('city')
    if(zipCode == null){
      app.ask('We got your city. Just to make sure, was it ' + city + '? If it was, say yes, otherwise, say no.')
    }
    else{
      app.ask('We got your zip code. Just to make sure, was it ' + zipCode + '? If it was, say yes, otherwise, say no.')
    }
  }


  let actionMap = new Map();
  actionMap.set(WELCOME_INTENT, welcomeIntent)
  actionMap.set(ZIP_INTENT, zipIntent)
  app.handleRequest(actionMap);
}
