function cordic( runs ) {
  var start = new Date();

  for ( var i = 0 ; i < runs ; i++ ) {
      cordicsincos();
  }

  var end = new Date();

  return end.getTime() - start.getTime();
}