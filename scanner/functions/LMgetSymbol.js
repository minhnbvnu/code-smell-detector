function LMgetSymbol(str) {
//return maximal initial substring of str that appears in names
//return null if there is none
  var k = 0; //new pos
  var j = 0; //old pos
  var mk; //match pos
  var st;
  var tagst;
  var match = "";
  var more = true;
  for (var i=1; i<=str.length && more; i++) {
    st = str.slice(0,i); //initial substring of length i
    j = k;
    k = LMposition(LMnames, st, j);
    if (k<LMnames.length && str.slice(0,LMnames[k].length)==LMnames[k]){
      match = LMnames[k];
      mk = k;
      i = match.length;
    }
    more = k<LMnames.length && str.slice(0,LMnames[k].length)>=LMnames[k];
  }
  LMpreviousSymbol=LMcurrentSymbol;
  if (match!=""){
    LMcurrentSymbol=LMsymbols[mk].ttype;
    return LMsymbols[mk];
  }
  LMcurrentSymbol=CONST;
  k = 1;
  st = str.slice(0,1); //take 1 character
  if ("0"<=st && st<="9") tagst = "mn";
  else tagst = (("A">st || st>"Z") && ("a">st || st>"z")?"mo":"mi");
/*
// Commented out by DRW (not fully understood, but probably to do with
// use of "/" as an INFIX version of "\\frac", which we don't want):
//}
//if (st=="-" && LMpreviousSymbol==INFIX) {
//  LMcurrentSymbol = INFIX;  //trick "/" into recognizing "-" on second parse
//  return {input:st, tag:tagst, output:st, ttype:UNARY, func:true};
//}
*/
  return {input:st, tag:tagst, output:st, ttype:CONST};
}