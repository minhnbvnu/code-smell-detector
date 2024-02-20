function apply_preprocessor_sourcemap(filename, svelte_map, preprocessor_map_input) {
    if (!svelte_map || !preprocessor_map_input)
      return svelte_map;
    const preprocessor_map = typeof preprocessor_map_input === "string" ? JSON.parse(preprocessor_map_input) : preprocessor_map_input;
    const result_map = combine_sourcemaps(filename, [
      svelte_map,
      preprocessor_map
    ]);
    Object.defineProperties(result_map, {
      toString: {
        enumerable: false,
        value: function toString2() {
          return JSON.stringify(this);
        }
      },
      toUrl: {
        enumerable: false,
        value: function toUrl() {
          return "data:application/json;charset=utf-8;base64," + b64enc(this.toString());
        }
      }
    });
    return result_map;
  }