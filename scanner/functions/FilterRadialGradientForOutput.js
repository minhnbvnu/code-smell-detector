function FilterRadialGradientForOutput(aValue, aEngine)
{
  if (aEngine == "generic")
    return aValue.substr(5);

  else if (aEngine == "webkit")
    return aValue.replace( /\-moz\-/g , "-webkit-")

  else if (aEngine != "webkit20110101")
    return "";

  var g = CssInspector.parseBackgroundImages(aValue)[0];

  var shape = ("shape" in g.value) ? g.value.shape : "";
  var size  = ("size"  in g.value) ? g.value.size : "";
  if (shape != "circle"
      || (size != "farthest-corner" && size != "cover"))
    return "";

  if (g.value.stops.length < 2
      || !("position" in g.value.stops[0])
      || !g.value.stops[g.value.stops.length - 1].position
      || !("position" in g.value.stops[0])
      || !g.value.stops[g.value.stops.length - 1].position)
    return "";

  for (var i = 0; i < g.value.stops.length; i++) {
    var s = g.value.stops[i];
    if (("position" in s) && s.position && s.position.indexOf("px") == -1)
      return "";
  }

  var str = "-webkit-gradient(radial, ";
  var position  = ("position"  in g.value) ? g.value.position : "center center";
  str += position + ", " +  parseFloat(g.value.stops[0].position) + ", ";
  str += position + ", " +  parseFloat(g.value.stops[g.value.stops.length - 1].position);

  // at this point we're sure to deal with pixels
  var current = parseFloat(g.value.stops[0].position);
  for (var i = 0; i < g.value.stops.length; i++) {
    var s = g.value.stops[i];
    if (!("position" in s) || !s.position) {
      var j = i + 1;
      while (j < g.value.stops.length && !g.value.stops[j].position)
        j++;
      var inc = parseFloat(g.value.stops[j].position) - current;
      for (var k = i; k < j; k++) {
        g.value.stops[k].position = (current + inc * (k - i + 1) / (j - i + 1)) + "px";
      }
    }
    current = parseFloat(s.position);
    var c = (current - parseFloat(g.value.stops[0].position)) /
            (parseFloat(g.value.stops[g.value.stops.length - 1].position) - parseFloat(g.value.stops[0].position));
    str += ", color-stop(" + c + ", " + s.color + ")";
  }
  str += ")"
  return str;
}