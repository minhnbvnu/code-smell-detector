function ChildFn(fn) {
      this.fn = fn;
      this.visible = true;
      this.domainTranslate = util.constructVector(config.dimensions, 0).map(function(v) {
        return new C.Variable(v);
      });
      this.domainTransform = numeric.identity(config.dimensions).map(function(row) {
        return row.map(function(v) {
          return new C.Variable(v);
        });
      });
      this.rangeTranslate = util.constructVector(config.dimensions, 0).map(function(v) {
        return new C.Variable(v);
      });
      this.rangeTransform = numeric.identity(config.dimensions).map(function(row) {
        return row.map(function(v) {
          return new C.Variable(v);
        });
      });
    }