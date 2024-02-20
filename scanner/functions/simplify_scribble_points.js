function simplify_scribble_points(control_points) {
  var filtered_points = [];

  var thresh = 2;

  var idx=0;
  for (var i=0; i<control_points.length; i++) {
    var cp = control_points[i];

    var next = control_points[i+1];
    if (i>0) {
      var prev = control_points[i-1];
    }

    if (next && prev) {
      dprev = vec2_sub(cp, prev);
      dnext = vec2_sub(next, cp);

      aprev = vec2_angle(dprev);
      anext = vec2_angle(dnext);

      delta = Math.abs(Math.abs(aprev)-Math.abs(anext));

      delta2 = vec2_magn(vec2_sub(cp,prev));
      if (delta2>thresh && delta>0.1) {
        filtered_points.push(cp);
      }
    }
    else {
      filtered_points.push(cp);
    }
  }

  return filtered_points;
}