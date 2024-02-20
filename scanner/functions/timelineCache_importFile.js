function timelineCache_importFile(file) {
  const fileName = file.name;
  let record = fileNameToProfilerDataMap.get(fileName);

  if (!record) {
    const callbacks = new Set();
    const wakeable = {
      then(callback) {
        callbacks.add(callback);
      },

      // Optional property used by Timeline:
      displayName: `Importing file "${fileName}"`
    };

    const wake = () => {
      // This assumes they won't throw.
      callbacks.forEach(callback => callback());
      callbacks.clear();
    };

    const newRecord = record = {
      status: timelineCache_Pending,
      value: wakeable
    };
    import_worker_importFile(file).then(data => {
      switch (data.status) {
        case 'SUCCESS':
          const resolvedRecord = newRecord;
          resolvedRecord.status = timelineCache_Resolved;
          resolvedRecord.value = data.processedData;
          break;

        case 'INVALID_PROFILE_ERROR':
        case 'UNEXPECTED_ERROR':
          const thrownRecord = newRecord;
          thrownRecord.status = timelineCache_Rejected;
          thrownRecord.value = data.error;
          break;
      }

      wake();
    });
    fileNameToProfilerDataMap.set(fileName, record);
  }

  const response = timelineCache_readRecord(record).value;
  return response;
}