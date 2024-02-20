function preprocess(code) {
      return interpolate(code, template).replace(/\$/g, /\d+/.exec(uid));
    }