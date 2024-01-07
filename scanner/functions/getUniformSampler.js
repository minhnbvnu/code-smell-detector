function getUniformSampler(inputInfo) {
	  var texName = inputInfo.name;
	  var inSize = sizeFromShape(inputInfo.shapeInfo.logicalShape);

	  if (inSize < 2) {
	    return "return " + texName + ";";
	  }

	  return "\n    for (int i = 0; i < " + inSize + "; i++) {\n      if (i == index) {\n        return " + texName + "[i];\n      }\n    }\n  ";
	}