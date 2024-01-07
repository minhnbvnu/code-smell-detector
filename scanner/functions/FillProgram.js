function FillProgram(shape, value) {
	    this.outputShape = [];
	    this.variableNames = ['x'];
	    this.outputShape = shape;
	    this.userCode = "\n      uniform float value;\n      void main() {\n        // Input can be obtained from uniform value.\n        setOutput(value);\n      }\n    ";
	  }