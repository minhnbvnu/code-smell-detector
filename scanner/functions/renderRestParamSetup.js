function renderRestParamSetup(functionNode, state) {
  var idx = state.localScope.tempVarIndex++;
  var len = state.localScope.tempVarIndex++;

  return 'for (var ' + functionNode.rest.name + '=[],' +
    utils.getTempVar(idx) + '=' + functionNode.params.length + ',' +
    utils.getTempVar(len) + '=arguments.length;' +
    utils.getTempVar(idx) + '<' +  utils.getTempVar(len) + ';' +
    utils.getTempVar(idx) + '++) ' +
    functionNode.rest.name + '.push(arguments[' + utils.getTempVar(idx) + ']);';
}