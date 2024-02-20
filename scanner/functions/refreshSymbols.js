function refreshSymbols(){
  var i;
  AMsymbols.sort(compareNames);
  for (i=0; i<AMsymbols.length; i++) AMnames[i] = AMsymbols[i].input;
}