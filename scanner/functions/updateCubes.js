function updateCubes( object, cohesion, strength, subtract ) {
  object.reset();
  object.cage();

  var i, ballx, bally, ballz, subtract, strength;
  for ( i = 0; i < points.length; i ++ ) {
    ballx = .5 + .5 * points[i].pos.x;
    bally = .5 + .5 * points[i].pos.y;
    ballz = .5 + .5 * points[i].pos.z
    object.addBall(ballx, bally, ballz, strength, subtract);
  }

}