function generatorResult(input, output, async) {
    var defs = cx.definitions.ecmascript;
    var valObj = new Obj(true);
    valObj.defProp("done").addType(cx.bool);
    output.propagate(valObj.defProp("value"));
    var retObj = valObj;

    if (async && defs) {
      retObj = new Obj(defs["Promise.prototype"]);
      retObj.getType().propagate(new DefProp(':t', valObj));
    }

    var method = new Fn(null, ANull, input ? [input] : [], input ? ["?"] : [], retObj);
    var result = new Obj(defs ? async ? defs.async_generator_prototype : defs.generator_prototype : true);
    result.defProp("next").addType(method);
    return result;
  }