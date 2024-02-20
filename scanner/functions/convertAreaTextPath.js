function convertAreaTextPath(frame) {
  var style = '';
  var path = frame.textPath;
  var obj;
  if (path.stroked || path.filled) {
    style += 'padding: 6px 6px 6px 7px;';
    if (path.filled) {
      obj = convertAiColor(path.fillColor, path.opacity);
      style += 'background-color: ' + obj.color + ';';
    }
    if (path.stroked) {
      obj = convertAiColor(path.strokeColor, path.opacity);
      style += 'border: 1px solid ' + obj.color + ';';
    }
  }
  return style;
}