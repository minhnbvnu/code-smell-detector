function ClipPackedProgram(aShape) {
	    this.variableNames = ['A'];
	    this.packedInputs = true;
	    this.packedOutput = true;
	    this.outputShape = aShape;
	    this.userCode = "\n      uniform float minVal;\n      uniform float maxVal;\n\n      void main() {\n        vec4 value = getAAtOutCoords();\n\n        if (any(isnan(value))) {\n          setOutput(value);\n          return;\n        }\n\n        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));\n      }\n    ";
	  }