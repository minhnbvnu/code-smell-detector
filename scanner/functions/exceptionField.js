function exceptionField(value) {
      var ast = parse(`
        exception id = {
          ${value}
        }
      `, '__filename');
      return ast.moduleBody.nodes[0].exceptionBody;
    }