function sc_pregexpReplace(re, s1, s2) {
   var reg;
   var jss1 = sc_string2jsstring(s1);
   var jss2 = sc_string2jsstring(s2);

   if (re instanceof RegExp) {
       if (re.global)
	   reg = re;
       else
	   reg = new RegExp(re.source);
   } else {
       reg = new RegExp(sc_string2jsstring(re));
   }

   return jss1.replace(reg, jss2);
}