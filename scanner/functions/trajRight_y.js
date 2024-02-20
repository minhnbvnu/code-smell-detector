function trajRight_y(u,dr){ // special coordinate for the route 20 for road 0
  var urel=u-u20Target;
  var y0=center_yPhys-offset20Target-radiusRight;
  var y=(urel<0)
      ? y0+urel
      : y0+(radiusRight+dr)*Math.sin(urel/radiusRight);
  return y;
}