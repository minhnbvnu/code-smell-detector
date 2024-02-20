function arrObjKeys(obj, inspect) {
    var isArr = isArray$1(obj);
    var xs2 = [];
    if (isArr) {
      xs2.length = obj.length;
      for (var i = 0; i < obj.length; i++) {
        xs2[i] = has$2(obj, i) ? inspect(obj[i], obj) : "";
      }
    }
    var syms = typeof gOPS === "function" ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
      symMap = {};
      for (var k2 = 0; k2 < syms.length; k2++) {
        symMap["$" + syms[k2]] = syms[k2];
      }
    }
    for (var key in obj) {
      if (!has$2(obj, key)) {
        continue;
      }
      if (isArr && String(Number(key)) === key && key < obj.length) {
        continue;
      }
      if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
        continue;
      } else if ($test.call(/[^\w$]/, key)) {
        xs2.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
      } else {
        xs2.push(key + ": " + inspect(obj[key], obj));
      }
    }
    if (typeof gOPS === "function") {
      for (var j = 0; j < syms.length; j++) {
        if (isEnumerable$1.call(obj, syms[j])) {
          xs2.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
        }
      }
    }
    return xs2;
  }