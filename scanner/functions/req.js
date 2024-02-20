function req(id) {
    try {
      var result = freeExports && freeRequire(id);
    } catch(e) { }
    return result || null;
  }