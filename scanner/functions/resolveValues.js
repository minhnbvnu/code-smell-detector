function resolveValues(technique, gltfScenegraph) {
    const values = Object.assign({}, technique.values);
    Object.keys(technique.uniforms || {}).forEach((uniform) => {
      if (technique.uniforms[uniform].value && !(uniform in values)) {
        values[uniform] = technique.uniforms[uniform].value;
      }
    });
    Object.keys(values).forEach((uniform) => {
      if (typeof values[uniform] === "object" && values[uniform].index !== void 0) {
        values[uniform].texture = gltfScenegraph.getTexture(values[uniform].index);
      }
    });
    return values;
  }