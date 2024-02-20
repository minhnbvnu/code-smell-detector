function makeNumber(n)
{
   var tmp = "";
  /* BEGIN LOOP */
   for (var i=0;i<n;i++)
   {
      var l = Math.floor(9*Math.random());
      tmp = tmp.concat(l);
   }
  /* END LOOP */
   return tmp;
}