function iterDeps(method, obj, depKey, seen, meta) {
  var guid = guidFor(obj);
  if (!seen[guid]) seen[guid] = {};
  if (seen[guid][depKey]) return;
  seen[guid][depKey] = true;

  var deps = meta.deps;
  deps = deps && deps[depKey];
  if (deps) {
    for(var key in deps) {
      var desc = meta.descs[key];
      if (desc && desc._suspended === obj) continue;
      method(obj, key);
    }
  }
}