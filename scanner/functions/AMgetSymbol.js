function AMgetSymbol(str) {
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
    k = position(AMnames, st, j);
    if (k<AMnames.length && str.slice(0,AMnames[k].length)==AMnames[k]){
      match = AMnames[k];
      mk = k;
      i = match.length;
    }
    more = k<AMnames.length && str.slice(0,AMnames[k].length)>=AMnames[k];
  }
  AMpreviousSymbol=AMcurrentSymbol;
  if (match!=""){
    AMcurrentSymbol=AMsymbols[mk].ttype;
    return AMsymbols[mk];
  }
// if str[0] is a digit or - return maxsubstring of digits.digits
  AMcurrentSymbol=CONST;
  k = 1;
  st = str.slice(0,1);
  var integ = true;
  while ("0"<=st && st<="9" && k<=str.length) {
    st = str.slice(k,k+1);
    k++;
  }
  if (st == decimalsign) {
    st = str.slice(k,k+1);
    if ("0"<=st && st<="9") {
      integ = false;
      k++;
      while ("0"<=st && st<="9" && k<=str.length) {
        st = str.slice(k,k+1);
        k++;
      }
    }
  }
  if ((integ && k>1) || k>2) {
    st = str.slice(0,k-1);
    tagst = "mn";
  } else {
    k = 2;
    st = str.slice(0,1); //take 1 character
    tagst = (("A">st || st>"Z") && ("a">st || st>"z")?"mo":"mi");
  }
  if (st=="-" && AMpreviousSymbol==INFIX) {
    AMcurrentSymbol = INFIX;  //trick "/" into recognizing "-" on second parse
    return {input:st, tag:tagst, output:st, ttype:UNARY, func:true};
  }
  return {input:st, tag:tagst, output:st, ttype:CONST};
}