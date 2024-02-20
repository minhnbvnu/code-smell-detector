function AstClass(name, body) {
      this.name = name;
      this.body = body;
      body.owner = this
    }