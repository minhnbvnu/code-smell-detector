function withWorklist(f) {
    if (cx.workList) return f(cx.workList);
    var list = [],
        depth = 0;

    var add = cx.workList = function (type, target, weight) {
      if (depth < baseMaxWorkDepth - reduceMaxWorkDepth * list.length) list.push(type, target, weight, depth);
    };

    var ret = f(add);

    for (var i = 0; i < list.length; i += 4) {
      if (timeout && +new Date() >= timeout) throw new exports.TimedOut();
      depth = list[i + 3] + 1;
      list[i + 1].addType(list[i], list[i + 2]);
    }

    cx.workList = null;
    return ret;
  }