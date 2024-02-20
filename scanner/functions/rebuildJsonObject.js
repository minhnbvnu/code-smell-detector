function rebuildJsonObject(batch, data) {
    assert(batch.batchType === "final-result");
    if (batch.jsonpath === "$") {
      return data;
    }
    if (batch.jsonpath && batch.jsonpath.length > 1) {
      const topLevelObject = batch.container;
      const streamingPath = new JSONPath(batch.jsonpath);
      streamingPath.setFieldAtPath(topLevelObject, data);
      return topLevelObject;
    }
    return batch.container;
  }