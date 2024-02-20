function newcommand(oldstr,newstr) {
  AMsymbols.push({input:oldstr, tag:"mo", output:newstr, tex:null, ttype:DEFINITION});
  refreshSymbols();
}