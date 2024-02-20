function removeImagesInSVG(content, path) {
  var dir = pathSplit(path)[0];
  var count = 0;
  content = content.replace(/<image[^<]+href="([^"]+)"[^<]+<\/image>/gm, function(match, href) {
    count++;
    deleteFile(pathJoin(dir, href));
    return '';
  });
  if (count > 0) {
    warnOnce('This document contains images or effects that can\'t be exported to SVG.');
  }
  return content;
}