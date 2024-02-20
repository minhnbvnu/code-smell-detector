function _updated(path, op) {
      if (!change.deleted[path[0]]) {
        updated.add(path, op);
      }
    }