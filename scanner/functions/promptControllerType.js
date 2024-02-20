function promptControllerType() {
  var userInput = msg.prompt('What kind of controller: object, array, or neither? [o|a|n]');
  return controllerTypeMap[userInput];
}