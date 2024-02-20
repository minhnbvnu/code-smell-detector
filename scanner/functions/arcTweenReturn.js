function arcTweenReturn(transition, newAngle) {

  transition.attrTween("d", function(d) {

    var interpolate = d3.interpolate(d.endAngle, newAngle);

    return function(t) {
      d.endAngle = interpolate(t);
      return phaseArcReturn(d);
    };
  });
}