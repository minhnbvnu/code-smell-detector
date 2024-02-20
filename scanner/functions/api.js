function api(value) {
      var ast = parse(`
        api ${value}
      `, '__filename');
      return ast.moduleBody.nodes[0].modelBody.nodes[0].attrs;
    }