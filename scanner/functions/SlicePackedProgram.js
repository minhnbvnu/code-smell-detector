function SlicePackedProgram(destSize) {
	    this.variableNames = ['source'];
	    this.packedInputs = true;
	    this.packedOutput = true;
	    this.outputShape = destSize;
	    this.rank = destSize.length;
	    var dtype = getCoordsDataType(this.rank);
	    var coords = getChannels('coords', this.rank);
	    var sourceLoc = getChannels('sourceLoc', this.rank);
	    var innerDims = this.rank === 1 ? 'sourceLoc' : "vec2(" + sourceLoc.slice(-2).join() + ")";
	    var getChannel = "getChannel(getSource(" + sourceLoc.join() + "), " + innerDims + ")";
	    var upperRow = "\n      result.x = " + getChannel + ";\n      if (++" + coords[this.rank - 1] + " < " + destSize[this.rank - 1] + ") {\n        ++" + sourceLoc[this.rank - 1] + ";\n        result.y = " + getChannel + ";\n        --" + sourceLoc[this.rank - 1] + ";\n      }\n    ";
	    var lowerRow = this.rank === 1 ? '' : "\n      --" + coords[this.rank - 1] + ";\n      if (++" + coords[this.rank - 2] + " < " + destSize[this.rank - 2] + ") {\n        ++" + sourceLoc[this.rank - 2] + ";\n        result.z = " + getChannel + ";\n        if (++" + coords[this.rank - 1] + " < " + destSize[this.rank - 1] + ") {\n          ++" + sourceLoc[this.rank - 1] + ";\n          result.w = " + getChannel + ";\n        }\n      }\n    ";
	    var sourceLocSetup = this.rank <= 4 ? "sourceLoc = coords +\n            " + dtype + "(" + destSize.map(function (_, i) {
	      return "start[" + i + "]";
	    }).join() + ");" : destSize.map(function (_, i) {
	      return sourceLoc[i] + " = " + coords[i] + " + start[" + i + "];";
	    }).join('\n');
	    this.userCode = "\n      uniform int start[" + this.rank + "];\n      void main() {\n        " + dtype + " coords = getOutputCoords();\n        " + dtype + " sourceLoc;\n        " + sourceLocSetup + "\n        vec4 result = vec4(0.);\n        " + upperRow + "\n        " + lowerRow + "\n        setOutput(result);\n      }\n    ";
	  }