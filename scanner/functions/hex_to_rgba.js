function hex_to_rgba(color) {

  if (!color || color == "transparent") {
    return {r:0,g:0,b:0,a:0};
  }

  if (color.match("rgb\\(")) {
    color = color.replace("rgb(","").replace(")","").split(",");
    return {
      r: color[0],
      g: color[1],
      b: color[2],
      a: 255
    };
  }

  if (color.match("rgba\\(")) {
    color = color.replace("rgba(","").replace(")","").split(",");
    return {
      r: color[0],
      g: color[1],
      b: color[2],
      a: color[3]*255
    };
  }

  var r = parseInt(color.substr(1,2), 16);
  var g = parseInt(color.substr(3,2), 16);
  var b = parseInt(color.substr(5,2), 16);
  var a = 255;
  if (color.length>7) {
    a = parseInt(color.substr(7,2), 16);
  }
  return {r:r,g:g,b:b,a:a};
}