function packedReshape(input, afterShape, backend) {
	  var input3DShape = [getBatchDim(input.shape)].concat(getRowsCols(input.shape));
	  var input3D = {
	    dtype: input.dtype,
	    shape: input3DShape,
	    dataId: input.dataId
	  };
	  var afterShapeAs3D = [getBatchDim(afterShape)].concat(getRowsCols(afterShape));
	  var program = new ReshapePackedProgram(afterShapeAs3D, input3DShape);
	  var preventEagerUnpackingOfOutput = true;
	  var output = backend.runWebGLProgram(program, [input3D], input.dtype, null
	  /* customSetup */
	  , preventEagerUnpackingOfOutput);
	  return {
	    dataId: output.dataId,
	    shape: afterShape,
	    dtype: output.dtype
	  };
	}