function sc_alert() {
   var len = arguments.length;
   var s = "";
   var i;

   for( i = 0; i < len; i++ ) {
       s += sc_toDisplayString(arguments[ i ]);
   }

   return alert( s );
}