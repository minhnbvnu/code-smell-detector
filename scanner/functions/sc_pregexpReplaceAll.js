function sc_pregexpReplaceAll(re, s1, s2) {
   var reg;
   var jss1 = sc_string2jsstring(s1);
   var jss2 = sc_string2jsstring(s2);

   if (re instanceof RegExp) {
      if (re.global)
	  reg = re;
      else
	  reg = new RegExp(re.source, "g");
   } else {
       reg = new RegExp(sc_string2jsstring(re), "g");
   }

   return jss1.replace(reg, jss2);
}