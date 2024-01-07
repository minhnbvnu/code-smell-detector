function getFloatTextureSampleSnippet(glsl) {
	  return "\n    float sampleTexture(sampler2D textureSampler, vec2 uv) {\n      return " + glsl.texture2D + "(textureSampler, uv).r;\n    }\n  ";
	}