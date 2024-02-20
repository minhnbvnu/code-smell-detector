function modelField(value) {
      var ast = parse(`
        model id = {
          ${value}
        }
      `, '__filename');
      return ast.moduleBody.nodes[0].modelBody;
    }