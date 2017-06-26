'use strict';

const ApiAiApp = require('actions-on-google').ApiAiApp

const WELCOME_INTENT = 'input.welcome'; //this is the name rom the API.AI intent. check the API.AI event console.
const LOCATION_INTENT = 'input.loc'
const HERE_INTENT = 'input.here'
const COMPLETE_INTENT  = 'input.accepted'
exports.silicon = (req, res) => {
  const app = new ApiAiApp({ request: req, response: res});
  function welcomeIntent(app){
    app.ask('Welcome to Silicon. Please say your zip code or city to continue.')
    return
  }

  function locationIntent(app){
    let zipCode = app.getArgument('zipVal')
    let city = app.getArgument('city')
    if(zipCode == null){
      app.ask('We got your city. Just to make sure, was it ' + city + '? If it was, say yes, otherwise, say no.')
    }
    else{
      app.ask('We got your zip code. Just to make sure, was it ' + zipCode + '? If it was, say yes, otherwise, say no.')
    }
  }

  function hereIntent(app){
    let locPermission = app.SupportedPermissions.DEVICE_PRECISE_LOCATION
    app.askForPermissions('To address you by name and know your location',[locPermission])
  }

  function gotLoc(app){
    if(app.isPermissionGranted()){
      let deviceCoordinates = app.getDeviceLocation().coordinates;
      app.ask("Your coordinates are: Latitude: " + deviceCoordinates.Latitude + "Longitude: " + deviceCoordinates.Longitude)
    }
    else{
      app.ask('Permission to access current location denied. Please either try again or utilize the other methods')
    }
  }

  let actionMap = new Map();
  actionMap.set(COMPLETE_INTENT, gotLoc)
  actionMap.set(WELCOME_INTENT, welcomeIntent)
  actionMap.set(HERE_INTENT, hereIntent)
  actionMap.set(LOCATION_INTENT, locationIntent)
  app.handleRequest(actionMap);
}
