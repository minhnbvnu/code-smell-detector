function hasConstructorOf(e, n) {
    if (!e || "object" !== _typeof(e)) return !1;
    var a = r(e);
    if (!a) return null === n;
    var o = t(a, "constructor") && a.constructor;
    return "function" != typeof o ? null === n : n === o || null !== n && Function.prototype.toString.call(o) === Function.prototype.toString.call(n) || "function" == typeof n && "string" == typeof o.__typeson__type__ && o.__typeson__type__ === n.__typeson__type__;
  }