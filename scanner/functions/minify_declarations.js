function minify_declarations(code, start, declarations) {
    let c2 = start;
    declarations.forEach((declaration, i) => {
      const separator = i > 0 ? ";" : "";
      if (declaration.node.start - c2 > separator.length) {
        code.update(c2, declaration.node.start, separator);
      }
      declaration.minify(code);
      c2 = declaration.node.end;
    });
    return c2;
  }