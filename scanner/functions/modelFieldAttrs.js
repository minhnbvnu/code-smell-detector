function modelFieldAttrs(value) {
      var ast = parse(`
        model id = {
          name: string${value}
        }
      `, '__filename');
      return ast.moduleBody.nodes[0].modelBody.nodes[0].attrs;
    }