function getPackedMatrixTextureShapeWidthHeight(rows, columns) {
	  return [Math.max(1, Math.ceil(columns / 2)), Math.max(1, Math.ceil(rows / 2))];
	}