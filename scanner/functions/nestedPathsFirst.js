function nestedPathsFirst(e, t) {
    var r, n;
    if ("" === e.keypath) return -1;
    var a = null !== (r = e.keypath.match(/\./g)) && void 0 !== r ? r : 0,
      o = null !== (n = t.keypath.match(/\./g)) && void 0 !== n ? n : 0;
    return a && (a = a.length), o && (o = o.length), a > o ? -1 : a < o ? 1 : e.keypath < t.keypath ? -1 : e.keypath > t.keypath ? 1 : 0;
  }