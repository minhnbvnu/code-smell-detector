function compile2(input) {
    const { code, path, target, dev, css, name: name2 } = input;
    const svelte = compile(code, {
      name: name2,
      filename: path,
      generate: target,
      hydratable: true,
      format: "esm",
      dev,
      css
    });
    return JSON.stringify({
      CSS: svelte.css.code,
      JS: svelte.js.code
    });
  }