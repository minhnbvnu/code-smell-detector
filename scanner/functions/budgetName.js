function budgetName(srv, file) {
    for (;;) {
      var parent = srv.fileMap[file.parent];
      if (!parent.parent) break;
      file = parent;
    }

    return file.name;
  }