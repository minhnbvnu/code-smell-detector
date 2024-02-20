function rewindState(state,ret){
  var lastBackgroundAdded = state.lastBackgroundAdded;
  var lastForegroundAdded = state.lastForegroundAdded;

  delete state.lastBackgroundAdded;
  delete state.lastForegroundAdded;

  Object.keys(state).forEach(function(key){
    if(state[key]){
      ret = codeCache[key].on + ret;
    }
  });

  if(lastBackgroundAdded && (lastBackgroundAdded != '\u001b[49m')){
    ret = lastBackgroundAdded + ret;
  }
  if(lastForegroundAdded && (lastForegroundAdded != '\u001b[39m')){
    ret = lastForegroundAdded + ret;
  }

  return ret;
}