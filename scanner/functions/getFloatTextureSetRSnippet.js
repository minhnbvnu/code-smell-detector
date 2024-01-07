function getFloatTextureSetRSnippet(glsl) {
	  return "\n    void setOutput(float val) {\n      " + glsl.output + " = vec4(val, 0, 0, 0);\n    }\n  ";
	}