function unwindState(state,ret){
  var lastBackgroundAdded = state.lastBackgroundAdded;
  var lastForegroundAdded = state.lastForegroundAdded;

  delete state.lastBackgroundAdded;
  delete state.lastForegroundAdded;

  Object.keys(state).forEach(function(key){
    if(state[key]){
      ret += codeCache[key].off;
    }
  });

  if(lastBackgroundAdded && (lastBackgroundAdded != '\u001b[49m')){
    ret += '\u001b[49m';
  }
  if(lastForegroundAdded && (lastForegroundAdded != '\u001b[39m')){
    ret += '\u001b[39m';
  }

  return ret;
}