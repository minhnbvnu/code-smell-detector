function LMremoveCharsAndBlanks(str,n) {
//remove n characters and any following blanks
  var st;
  st = str.slice(n);
  for (var i=0; i<st.length && st.charCodeAt(i)<=32; i=i+1);
  return st.slice(i);
}