function createPaths(text, size, data) {

  var chars = Array.from ? Array.from(text) : String(text).split(''); // see #13988
  var scale = size / data.resolution;
  var line_height = (data.boundingBox.yMax - data.boundingBox.yMin + data.underlineThickness) * scale;

  var paths = [];

  var offsetX = 0,
    offsetY = 0;

  for (var i = 0; i < chars.length; i++) {

    var char = chars[i];

    if (char === '\n') {

      offsetX = 0;
      offsetY -= line_height;

    } else {

      var ret = createPath(char, scale, offsetX, offsetY, data);
      offsetX += ret.offsetX;
      paths.push(ret.path);

    }

  }

  return paths;

}