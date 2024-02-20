function colorizeLines(input){
  var state = {};
  var output = [];
  for(var i = 0; i < input.length; i++){
    var line = rewindState(state,input[i]) ;
    state = readState(line);
    var temp = objectAssign({},state);
    output.push(unwindState(temp,line));
  }
  return output;
}