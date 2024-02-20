function registerimport(importname) {
    var state = cx.state;
    for (var t = state.importedtypes; t; t = t.next)
      if(t.name == importname) return;
    state.importedtypes = { name: importname, next: state.importedtypes };
  }