function demangleCpp(name) {
  if (name.startsWith('__Z')) {
    let result = cache.get(name);

    if (result !== undefined) {
      name = result;
    } else {
      if (!cppfilt) {
        cppfilt = new Function('exports', code)();
      }

      result = cppfilt(name.slice(1));
      result = result === '(null)' ? name : result;
      cache.set(name, result);
      name = result;
    }
  }

  return name;
}