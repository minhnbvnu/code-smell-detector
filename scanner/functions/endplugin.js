function endplugin(startOfLine) {
  return function(type) {
    if (
      type == "selfclosePlugin" ||
        type == "endPlugin"
    )
      return cont();
    if (type == "endPlugin") {pushContext(curState.pluginName, startOfLine); return cont();}
    return cont();
  };
}