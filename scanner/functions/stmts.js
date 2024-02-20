function stmts(value) {
      var ast = parse(`
        api id(): string {
          method = "GET";
          pathname = "/";
        } returns {
          ${value}
        }
      `, '__filename');

      const api = ast.moduleBody.nodes[0];
      return api.returns;
    }