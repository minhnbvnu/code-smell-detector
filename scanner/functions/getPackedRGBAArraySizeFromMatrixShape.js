function getPackedRGBAArraySizeFromMatrixShape(rows, columns) {
	  var _getPackedMatrixTextu = getPackedMatrixTextureShapeWidthHeight(rows, columns),
	      w = _getPackedMatrixTextu[0],
	      h = _getPackedMatrixTextu[1];

	  return w * h * 4;
	}