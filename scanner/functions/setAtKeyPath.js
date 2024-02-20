function setAtKeyPath(e, t, r) {
    if ("" === t) return r;
    if (!e || "object" !== _typeof(e)) throw new TypeError("Unexpected non-object type");
    var n = t.indexOf(".");
    return n > -1 ? setAtKeyPath(e[unescapeKeyPathComponent(t.slice(0, n))], t.slice(n + 1), r) : (e[unescapeKeyPathComponent(t)] = r, e);
  }