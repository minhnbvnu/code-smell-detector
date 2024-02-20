function moduleBody(value) {
      var ast = parse(`
        ${value}
      `, '__filename');
      return ast.moduleBody;
    }