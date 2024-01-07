function getTilingPatternIR(operatorList, dict, color) {
  const matrix = dict.getArray("Matrix");

  const bbox = _util.Util.normalizeRect(dict.getArray("BBox"));

  const xstep = dict.get("XStep");
  const ystep = dict.get("YStep");
  const paintType = dict.get("PaintType");
  const tilingType = dict.get("TilingType");

  if (bbox[2] - bbox[0] === 0 || bbox[3] - bbox[1] === 0) {
    throw new _util.FormatError(`Invalid getTilingPatternIR /BBox array: [${bbox}].`);
  }

  return ["TilingPattern", color, operatorList, matrix, bbox, xstep, ystep, paintType, tilingType];
}