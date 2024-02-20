function inferClass(node, scope, name) {
    if (!name && node.id) name = node.id.name;
    var sup = cx.protos.Object,
        supCtor,
        delayed;

    if (node.superClass) {
      if (node.superClass.type == "Literal" && node.superClass.value == null) {
        sup = null;
      } else {
        var supVal = infer(node.superClass, scope),
            supProto;
        supCtor = supVal.getFunctionType();

        if (supCtor && (supProto = supCtor.getProp("prototype").getObjType())) {
          sup = supProto;
        } else {
          supCtor = supVal;
          delayed = supVal.getProp("prototype");
        }
      }
    }

    var proto = new Obj(sup, name && name + ".prototype");
    if (delayed) delayed.propagate(new HasProto(proto));
    return withSuper(supCtor, delayed || sup, function () {
      var ctor,
          body = node.body.body;

      for (var i = 0; i < body.length; i++) if (body[i].kind == "constructor") ctor = body[i].value;

      var fn = node.objType = ctor ? infer(ctor, scope) : new Fn(name, ANull, [], null, ANull);
      fn.originNode = node.id || ctor || node;
      var inst = getInstance(proto, fn);
      fn.self.addType(inst);
      fn.defProp("prototype", node).addType(proto);

      for (var i = 0; i < body.length; i++) {
        var method = body[i],
            target;
        if (method.kind == "constructor") continue;
        var pName = propName(method, scope);

        if (pName == "<i>" || method.kind == "set") {
          target = ANull;
        } else {
          target = (method.static ? fn : proto).defProp(pName, method.key);
          target.initializer = true;
          if (method.kind == "get") target = new IsCallee(inst, [], null, target);
        }

        infer(method.value, scope, target);
        var methodFn = target.getFunctionType();
        if (methodFn) methodFn.self.addType(inst);
      }

      return fn;
    });
  }