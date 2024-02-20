function findGitHubIssue(errorMessage) {
  errorMessage = normalizeErrorMessage(errorMessage);
  const map = getRecordMap();
  let record = map.get(errorMessage);

  if (!record) {
    const callbacks = new Set();
    const wakeable = {
      then(callback) {
        callbacks.add(callback);
      },

      // Optional property used by Timeline:
      displayName: `Searching GitHub issues for error "${errorMessage}"`
    };

    const wake = () => {
      // This assumes they won't throw.
      callbacks.forEach(callback => callback());
      callbacks.clear();
    };

    const newRecord = record = {
      status: cache_Pending,
      value: wakeable
    };
    let didTimeout = false;
    searchGitHubIssues(errorMessage).then(maybeItem => {
      if (didTimeout) {
        return;
      }

      if (maybeItem) {
        const resolvedRecord = newRecord;
        resolvedRecord.status = cache_Resolved;
        resolvedRecord.value = maybeItem;
      } else {
        const notFoundRecord = newRecord;
        notFoundRecord.status = cache_Rejected;
        notFoundRecord.value = null;
      }

      wake();
    }).catch(error => {
      const thrownRecord = newRecord;
      thrownRecord.status = cache_Rejected;
      thrownRecord.value = null;
      wake();
    }); // Only wait a little while for GitHub results before showing a fallback.

    setTimeout(() => {
      didTimeout = true;
      const timedoutRecord = newRecord;
      timedoutRecord.status = cache_Rejected;
      timedoutRecord.value = null;
      wake();
    }, API_TIMEOUT);
    map.set(errorMessage, record);
  }

  const response = readRecord(record).value;
  return response;
}