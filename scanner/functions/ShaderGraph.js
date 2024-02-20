function ShaderGraph(snippets, config) {
    var defaults;
    if (!(this instanceof ShaderGraph)) {
      return new ShaderGraph(snippets, config);
    }
    defaults = {
      globalUniforms: false,
      globalVaryings: true,
      globalAttributes: true,
      globals: [],
      autoInspect: false
    };
    this.config = merge(defaults, config);
    this.fetch = cache(library(GLSL, snippets, Snippet.load));
  }