function applyBoundingBoxToBrushData(brushData, props) {
  var type = brushData[0];
  var width = +props.width;
  var height = +props.height;
  if (type === LINEAR_GRADIENT) {
    brushData[1] *= width;
    brushData[2] *= height;
    brushData[3] *= width;
    brushData[4] *= height;
  } else if (type === RADIAL_GRADIENT) {
    brushData[1] *= width;
    brushData[2] *= height;
    brushData[3] *= width;
    brushData[4] *= height;
    brushData[5] *= width;
    brushData[6] *= height;
  } else if (type === PATTERN) {
    // todo
  }
}