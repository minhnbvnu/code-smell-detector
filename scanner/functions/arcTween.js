function arcTween(transition, newAngle, arcIndex) {

  transition.attrTween("d", function(d) {

    var interpolate = d3.interpolate(d.endAngle, newAngle);

    return function(t) {
      d.endAngle = interpolate(t);
      return phaseArcs[arcIndex](d);
    };
  });
}