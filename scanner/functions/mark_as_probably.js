function mark_as_probably(result) {
    for (const key of result.keys()) {
      result.set(key, NodeExist.Probably);
    }
  }