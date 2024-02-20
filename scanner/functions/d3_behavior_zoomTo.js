function d3_behavior_zoomTo(z, x0, x1) {
  z = d3_behavior_zoomExtentClamp(z, 2);
  var j = Math.pow(2, d3_behavior_zoomXyz[2]),
      k = Math.pow(2, z),
      K = Math.pow(2, (d3_behavior_zoomXyz[2] = z) - x1[2]),
      x_ = d3_behavior_zoomXyz[0],
      y_ = d3_behavior_zoomXyz[1],
      x = d3_behavior_zoomXyz[0] = d3_behavior_zoomExtentClamp((x0[0] - x1[0] * K), 0, k),
      y = d3_behavior_zoomXyz[1] = d3_behavior_zoomExtentClamp((x0[1] - x1[1] * K), 1, k),
      o = d3.event; // Events can be reentrant (e.g., focus).

  d3.event = {
    scale: k,
    translate: [x, y],
    transform: function(sx, sy) {
      if (sx) transform(sx, x_, x);
      if (sy) transform(sy, y_, y);
    }
  };

  function transform(scale, a, b) {
    scale.domain(scale.range().map(function(v) { return scale.invert(((v - b) * j) / k + a); }));
  }

  try {
    d3_behavior_zoomDispatch.apply(d3_behavior_zoomTarget, d3_behavior_zoomArguments);
  } finally {
    d3.event = o;
  }

  o.preventDefault();
}