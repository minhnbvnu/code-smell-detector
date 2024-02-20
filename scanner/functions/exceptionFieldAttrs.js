function exceptionFieldAttrs(value) {
      var ast = parse(`
        exception id = {
          name: string${value}
        }
      `, '__filename');
      return ast.moduleBody.nodes[0].exceptionBody.nodes[0].attrs;
    }