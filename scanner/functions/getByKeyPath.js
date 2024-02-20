function getByKeyPath(e, t) {
    if ("" === t) return e;
    if (null === e || "object" !== _typeof(e)) throw new TypeError("Unexpected non-object type");
    var r = t.indexOf(".");
    if (r > -1) {
      var n = e[unescapeKeyPathComponent(t.slice(0, r))];
      return void 0 === n ? void 0 : getByKeyPath(n, t.slice(r + 1));
    }
    return e[unescapeKeyPathComponent(t)];
  }