function sc_pregexpSplit(re, s) {
   var reg = ((re instanceof RegExp) ?
	      re :
	      new RegExp(sc_string2jsstring(re)));
   var jss = sc_string2jsstring(s);
   var tmp = jss.split(reg);

   if (tmp == null) return false;

   return sc_vector2list(tmp);
}