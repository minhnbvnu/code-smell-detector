function inspectedElementCache_inspectElement(element, path, store, bridge) {
  const map = inspectedElementCache_getRecordMap();
  let record = map.get(element);

  if (!record) {
    const callbacks = new Set();
    const wakeable = {
      then(callback) {
        callbacks.add(callback);
      },

      // Optional property used by Timeline:
      displayName: `Inspecting ${element.displayName || 'Unknown'}`
    };

    const wake = () => {
      // This assumes they won't throw.
      callbacks.forEach(callback => callback());
      callbacks.clear();
    };

    const newRecord = record = {
      status: inspectedElementCache_Pending,
      value: wakeable
    };
    const rendererID = store.getRendererIDForElement(element.id);

    if (rendererID == null) {
      const rejectedRecord = newRecord;
      rejectedRecord.status = inspectedElementCache_Rejected;
      rejectedRecord.value = new Error(`Could not inspect element with id "${element.id}". No renderer found.`);
      map.set(element, record);
      return null;
    }

    inspectedElementMutableSource_inspectElement({
      bridge,
      element,
      path,
      rendererID: rendererID
    }).then(([inspectedElement]) => {
      const resolvedRecord = newRecord;
      resolvedRecord.status = inspectedElementCache_Resolved;
      resolvedRecord.value = inspectedElement;
      wake();
    }, error => {
      console.error(error);
      const rejectedRecord = newRecord;
      rejectedRecord.status = inspectedElementCache_Rejected;
      rejectedRecord.value = error;
      wake();
    });
    map.set(element, record);
  }

  const response = inspectedElementCache_readRecord(record).value;
  return response;
}