function createVertexShader$1(gl) {
	  var glsl = getGlslDifferences();
	  var vertexShaderSource = glsl.version + "\n    precision highp float;\n    " + glsl.attribute + " vec3 clipSpacePos;\n    " + glsl.attribute + " vec2 uv;\n    " + glsl.varyingVs + " vec2 resultUV;\n\n    void main() {\n      gl_Position = vec4(clipSpacePos, 1);\n      resultUV = uv;\n    }";
	  return createVertexShader(gl, vertexShaderSource);
	}