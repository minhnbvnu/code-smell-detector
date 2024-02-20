function AMinitSymbols() {
  var i;
  var symlen = AMsymbols.length;
  for (i=0; i<symlen; i++) {
    if (AMsymbols[i].tex && !(typeof AMsymbols[i].notexcopy == "boolean" && AMsymbols[i].notexcopy)) {
       AMsymbols.push({input:AMsymbols[i].tex,
        tag:AMsymbols[i].tag, output:AMsymbols[i].output, ttype:AMsymbols[i].ttype,
        acc:(AMsymbols[i].acc||false)});
    }
  }
  refreshSymbols();
}