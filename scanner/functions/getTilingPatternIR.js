function getTilingPatternIR(operatorList, dict, args) {
  var matrix = dict.get('Matrix');
  var bbox = dict.get('BBox');
  var xstep = dict.get('XStep');
  var ystep = dict.get('YStep');
  var paintType = dict.get('PaintType');
  var tilingType = dict.get('TilingType');

  return [
    'TilingPattern', args, operatorList, matrix, bbox, xstep, ystep,
    paintType, tilingType
  ];
}