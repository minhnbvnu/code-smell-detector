function getFloatTextureSetRGBASnippet(glsl) {
	  return "\n    void setOutput(vec4 val) {\n      " + glsl.output + " = val;\n    }\n  ";
	}