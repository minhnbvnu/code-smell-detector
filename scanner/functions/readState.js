function readState(line){
  var code = codeRegex(true);
  var controlChars = code.exec(line);
  var state = {};
  while(controlChars !== null){
    updateState(state, controlChars);
    controlChars = code.exec(line);
  }
  return state;
}