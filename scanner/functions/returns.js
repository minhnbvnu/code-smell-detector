function returns(value) {
      var ast = parse(`
        api id(): string {
          __request.method = "GET";
          __request.pathname = "/";
        } returns ${value}
      `, '__filename');

      const api = ast.moduleBody.nodes[0];
      return api.apiBody;
    }