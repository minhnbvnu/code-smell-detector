function step$2(_ref) {
	  var inputs = _ref.inputs,
	      attrs = _ref.attrs,
	      backend = _ref.backend;
	  var x = inputs.x;
	  var opSnippet = CHECK_NAN_SNIPPET + ("\n    return x > 0.0 ? 1.0 : float(" + attrs.alpha + ");\n  ");
	  var program = new UnaryOpProgram(x.shape, opSnippet);
	  return backend.runWebGLProgram(program, [x], x.dtype);
	}