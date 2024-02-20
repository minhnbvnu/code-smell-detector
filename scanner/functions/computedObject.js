function computedObject(names, types) {
    return function(self, args) {
      var obj = new infer.Obj;
      names.forEach(function (prop, i) {
        obj.defProp(prop).addType(unwrapType(types[i], self, args));
      });
      return obj;
    };
  }