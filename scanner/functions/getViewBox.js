function getViewBox(svgData) {

  let viewBox = svgData.match(/viewBox="(.*?)"/gm);

  let size;
  let result;
  if (Array.isArray(viewBox)) {
    size = viewBox[0].match(/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g);
    result = { width: parseFloat(size[2]), height: parseFloat(size[3]) };
  }

  return result;
}