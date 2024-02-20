function reflectMethod(sObject, sMeth, tObject, tMeth) {
  tObject[tMeth || sMeth] = function() {
    return sObject[sMeth].apply(sObject, arguments);
  };
}