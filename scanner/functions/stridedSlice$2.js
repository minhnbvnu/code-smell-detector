function stridedSlice$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var begin = attrs.begin,
	      end = attrs.end,
	      strides = attrs.strides,
	      beginMask = attrs.beginMask,
	      endMask = attrs.endMask,
	      ellipsisMask = attrs.ellipsisMask,
	      newAxisMask = attrs.newAxisMask,
	      shrinkAxisMask = attrs.shrinkAxisMask;

	  var _slice_util$sliceInfo = sliceInfo(x.shape, begin, end, strides, beginMask, endMask, ellipsisMask, newAxisMask, shrinkAxisMask),
	      nonStrided = _slice_util$sliceInfo.nonStrided,
	      $begin = _slice_util$sliceInfo.$begin,
	      $strides = _slice_util$sliceInfo.$strides,
	      size = _slice_util$sliceInfo.size,
	      newShape = _slice_util$sliceInfo.newShape,
	      outShape = _slice_util$sliceInfo.outShape;

	  var $x = reshape$3({
	    inputs: {
	      x: x
	    },
	    backend: backend,
	    attrs: {
	      shape: newShape
	    }
	  });
	  var result;

	  if (nonStrided) {
	    var sliced = slice$4({
	      inputs: {
	        x: $x
	      },
	      backend: backend,
	      attrs: {
	        begin: $begin,
	        size: size
	      }
	    });
	    result = reshape$3({
	      inputs: {
	        x: sliced
	      },
	      backend: backend,
	      attrs: {
	        shape: outShape
	      }
	    });
	    backend.disposeIntermediateTensorInfo(sliced);
	  } else if (outShape.some(function (axis) {
	    return axis === 0;
	  })) {
	    result = backend.makeTensorInfo(outShape, x.dtype, []);
	  } else {
	    var shouldExecuteOnCPU = backend.shouldExecuteOnCPU([$x]);

	    if (shouldExecuteOnCPU) {
	      var xTexData = backend.texData.get($x.dataId);
	      var values = xTexData.values;
	      var xBuf = buffer($x.shape, $x.dtype, values);
	      var resultValues = stridedSliceImplCPU(outShape, xBuf, $strides, $begin);
	      result = backend.makeTensorInfo(outShape, $x.dtype, resultValues.values);
	    } else {
	      var program = new StridedSliceProgram($begin, $strides, outShape);
	      result = backend.runWebGLProgram(program, [$x], $x.dtype);
	    }
	  }

	  var resultReshaped = reshape$3({
	    inputs: {
	      x: result
	    },
	    backend: backend,
	    attrs: {
	      shape: outShape
	    }
	  });
	  backend.disposeIntermediateTensorInfo($x);
	  backend.disposeIntermediateTensorInfo(result);
	  return resultReshaped;
	}