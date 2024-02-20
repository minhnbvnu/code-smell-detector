function render_vector_drawing(a, padding) {
  var shape = a.shape || "";
  var path = [];
  if(typeof a.control_points == 'string'){
    a.control_points = JSON.parse(a.control_points);
  }
  var p = a.control_points[0];

  if (!p) return "";

  path.push("M" + (p.dx + padding) + "," + (p.dy + padding) + " ");

  if (shape.match("arrow")) {
    var cps = a.control_points[0];
    var cpe = a.control_points[1];
    var cpm = a.control_points[2];
    if (!cpm) cpm = cpe;

    var markerId = a._id;

    var origin = cps;
    var end = cpe;
    var vec = vec2_sub(end, origin);
    var length = vec2_magn(vec);
    var middleVec = vec2_mul(vec2_unit(vec),length / 2);
    var middlePoint = vec2_add(origin, middleVec);
    var ortho = vec2_sub(cpm, middlePoint);
    var scaledMiddlePoint = vec2_add(vec2_mul(ortho,2), middlePoint);

    var d = "M" + (cps.dx + padding) + "," + (cps.dy + padding) + " Q" + (scaledMiddlePoint.dx + padding) + "," + (scaledMiddlePoint.dy + padding) + " " + (cpe.dx + padding) + "," + (cpe.dy + padding);
    var tip  = "<defs><marker id='ae" + markerId + "' refX=\"0.1\" refY=\"3\" markerWidth=\"3\" markerHeight=\"6\" orient=\"auto\">";
        tip += "<path d=\"M-3,0 V6 L3,3 Z\" fill=\""+a.stroke_color+"\" stroke-width=\"0\"/></marker></defs>";
    var svg = tip + "<path d='" + d + "' style='stroke-width:" + a.stroke + ";' marker-end='url(#ae" + markerId + ")'/>";

    return svg;
  }
  else if (false /*shape.match("scribble")*/) {
    var idx = 0;
    while (idx < a.control_points.length - 1) {
      var prevP = a.control_points[idx];
      
      if (a.control_points.length > idx + 1) {
        var p = a.control_points[idx + 1];
      } else {
        var p = prevP;
      }

      if (a.control_points.length > idx + 2) {
        var nextP = a.control_points[idx + 2];
      } else {
        var nextP = p;
      }

      var dpy = (p.dy - prevP.dy);
      var dpx = (p.dx - prevP.dx);
      var dny = (nextP.dy - p.dy);
      var dnx = (nextP.dx - p.dx);

      var distToNext = Math.sqrt(dny * dny + dnx * dnx);
      var distToPrev = Math.sqrt(dpy * dpy + dpx * dpx);

      var r = Math.sqrt((distToNext + distToPrev) / 2) * 2;

      var prevAngle = Math.atan2(dpy, dpx);
      var nextAngle = Math.atan2(dny, dnx);
      var bisectAngle = (prevAngle + nextAngle) / 2;
      var tangentAngle = bisectAngle;

      var cp1x = p.dx + Math.cos(tangentAngle) * -r;
      var cp1y = p.dy + Math.sin(tangentAngle) * -r;
      var cp2x = p.dx + Math.cos(tangentAngle) * r;
      var cp2y = p.dy + Math.sin(tangentAngle) * r;

      var dcp1x = cp1x - nextP.dx;
      var dcp1y = cp1y - nextP.dy;
      var dcp2x = cp2x - nextP.dx;
      var dcp2y = cp2y - nextP.dy;

      var distToCp1 = Math.sqrt(dcp1x * dcp1x + dcp1y * dcp1y) / r;
      var distToCp2 = Math.sqrt(dcp2x * dcp2x + dcp2y * dcp2y) / r;

      if (distToCp1 > distToCp2) {
        var curve = "S" + (cp1x + padding) + "," + (cp1y + padding) + " " + (p.dx + padding) + "," + (p.dy + padding);
      }
      else {
        var curve = "S" + (cp2x + padding) + "," + (cp2y + padding) + " " + (p.dx + padding) + "," + (p.dy + padding);
      }

      path.push(curve);
      idx += 1;
    }
  } else {
    for (var idx=0; idx<a.control_points.length; idx++) {
      var p = a.control_points[idx];
      var command = (idx==0) ? 'M' : 'L';

      path.push(command+(p.dx+padding)+','+(p.dy+padding));
    }
  }

  return "<path d='"+path.join(' ')+"'>";
}