function Schema$5(definition) {
      this.include = definition.include || [];
      this.implicit = definition.implicit || [];
      this.explicit = definition.explicit || [];
      this.implicit.forEach(function (type) {
        if (type.loadKind && type.loadKind !== 'scalar') {
          throw new YAMLException$2('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
        }
      });
      this.compiledImplicit = compileList(this, 'implicit', []);
      this.compiledExplicit = compileList(this, 'explicit', []);
      this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
    }