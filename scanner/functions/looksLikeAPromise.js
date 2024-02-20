function looksLikeAPromise(obj) {
  return obj && typeof (obj.then) === "function";
}