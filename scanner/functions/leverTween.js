function leverTween(transition, newAngle)
{
  transition.attrTween("x2", function(d) {
    var interpolate = d3.interpolate(d.phase, newAngle);
      return function(t) {
        d.phase = interpolate(t);
        return xRange(Math.cos(d.phase) * 5);
      };
  });

  transition.attrTween("y2", function(d) {
    var interpolate = d3.interpolate(d.phase, newAngle);
      return function(t) {
        d.phase = interpolate(t);
        return xRange(Math.sin(d.phase) * 5);
      };
  });
}