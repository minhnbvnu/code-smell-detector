function FilterLinearGradientForOutput(aValue, aEngine)
{
  if (aEngine == "generic")
    return aValue.substr(5);

  if (aEngine == "webkit")
    return aValue.replace( /\-moz\-/g , "-webkit-")

  if (aEngine != "webkit20110101")
    return "";

  var g = CssInspector.parseBackgroundImages(aValue)[0];

  var cancelled = false;
  var str = "-webkit-gradient(linear, ";
  var position = ("position" in g.value) ? g.value.position.toLowerCase() : "";
  var angle    = ("angle" in g.value) ? g.value.angle.toLowerCase() : "";
  // normalize angle
  if (angle) {
    var match = angle.match(/^([0-9\-\.\\+]+)([a-z]*)/);
    var angle = parseFloat(match[1]);
    var unit  = match[2];
    switch (unit) {
      case "grad": angle = angle * 90 / 100; break;
      case "rad":  angle = angle * 180 / Math.PI; break;
      default: break;
    }
    while (angle < 0)
      angle += 360;
    while (angle >= 360)
      angle -= 360;
  }
  // get startpoint w/o keywords
  var startpoint = [];
  var endpoint = [];
  if (position != "") {
    if (position == "center")
      position = "center center";
    startpoint = position.split(" ");
    if (angle == "" && angle != 0) {
      // no angle, then we just turn the point 180 degrees around center
      switch (startpoint[0]) {
        case "left":   endpoint.push("right"); break;
        case "center": endpoint.push("center"); break;
        case "right":  endpoint.push("left"); break;
        default: {
            var match = startpoint[0].match(/^([0-9\-\.\\+]+)([a-z]*)/);
            var v     = parseFloat(match[0]);
            var unit  = match[1];
            if (unit == "%") {
              endpoint.push((100-v) + "%");
            }
            else
              cancelled = true;
          }
          break;
      }
      if (!cancelled)
        switch (startpoint[1]) {
          case "top":    endpoint.push("bottom"); break;
          case "center": endpoint.push("center"); break;
          case "bottom": endpoint.push("top"); break;
          default: {
              var match = startpoint[1].match(/^([0-9\-\.\\+]+)([a-z]*)/);
              var v     = parseFloat(match[0]);
              var unit  = match[1];
              if (unit == "%") {
                endpoint.push((100-v) + "%");
              }
              else
                cancelled = true;
            }
            break;
        }
    }
    else {
      switch (angle) {
        case 0:    endpoint.push("right"); endpoint.push(startpoint[1]); break;
        case 90:   endpoint.push(startpoint[0]); endpoint.push("top"); break;
        case 180:  endpoint.push("left"); endpoint.push(startpoint[1]); break;
        case 270:  endpoint.push(startpoint[0]); endpoint.push("bottom"); break;
        default:     cancelled = true; break;
      }
    }
  }
  else {
    // no position defined, we accept only vertical and horizontal
    if (angle == "")
      angle = 270;
    switch (angle) {
      case 0:    startpoint= ["left", "center"];   endpoint = ["right", "center"]; break;
      case 90:   startpoint= ["center", "bottom"]; endpoint = ["center", "top"]; break;
      case 180:  startpoint= ["right", "center"];  endpoint = ["left", "center"]; break;
      case 270:  startpoint= ["center", "top"];    endpoint = ["center", "bottom"]; break;
      default:     cancelled = true; break;
    }
  }

  if (cancelled)
    return "";

  str += startpoint.join(" ") + ", " + endpoint.join(" ");
  if (!g.value.stops[0].position)
    g.value.stops[0].position = "0%";
  if (!g.value.stops[g.value.stops.length-1].position)
    g.value.stops[g.value.stops.length-1].position = "100%";
  var current = 0;
  for (var i = 0; i < g.value.stops.length && !cancelled; i++) {
    var s = g.value.stops[i];
    if (s.position) {
      if (s.position.indexOf("%") == -1) {
        cancelled = true;
        break;
      }
    }
    else {
      var j = i + 1;
      while (j < g.value.stops.length && !g.value.stops[j].position)
        j++;
      var inc = parseFloat(g.value.stops[j].position) - current;
      for (var k = i; k < j; k++) {
        g.value.stops[k].position = (current + inc * (k - i + 1) / (j - i + 1)) + "%";
      }
    }
    current = parseFloat(s.position);
    str += ", color-stop(" + (parseFloat(current) / 100) + ", " + s.color + ")";
  }

  if (cancelled)
    return "";
  return str + ")";
}