function sc_dirname(p) {
   var i = p.lastIndexOf('/');

   if(i >= 0)
      return p.substring(0, i);
   else
      return '';
}