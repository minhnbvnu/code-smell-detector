function getKeyFromTextureShape(shapeRowsCol, physicalTexType, isPacked) {
	  return shapeRowsCol[0] + "_" + shapeRowsCol[1] + "_" + physicalTexType + "_" + isPacked;
	}