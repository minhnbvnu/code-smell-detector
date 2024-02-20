function parentDepth(srv, parent) {
    var depth = 0;

    while (parent) {
      parent = srv.fileMap[parent].parent;
      ++depth;
    }

    return depth;
  }