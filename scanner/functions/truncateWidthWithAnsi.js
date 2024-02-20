function truncateWidthWithAnsi(str, desiredLength){
  var code = codeRegex(true);
  var split = str.split(codeRegex());
  var splitIndex = 0;
  var retLen = 0;
  var ret = '';
  var myArray;
  var state = {};

  while(retLen < desiredLength){
    myArray = code.exec(str);
    var toAdd = split[splitIndex];
    splitIndex++;
    if (retLen + strlen(toAdd) > desiredLength){
      toAdd = truncateWidth(toAdd, desiredLength - retLen);
    }
    ret += toAdd;
    retLen += strlen(toAdd);

    if(retLen < desiredLength){
      if (!myArray) { break; }  // full-width chars may cause a whitespace which cannot be filled
      ret += myArray[0];
      updateState(state,myArray);
    }
  }

  return unwindState(state,ret);
}