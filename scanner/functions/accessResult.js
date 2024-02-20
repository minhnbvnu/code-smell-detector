function accessResult(resource, fetch, input, key) {
  const entriesForResource = getEntriesForResource(resource);
  const entry = entriesForResource.get(key);

  if (entry === undefined) {
    const thenable = fetch(input);
    thenable.then(value => {
      if (newResult.status === Pending) {
        const resolvedResult = newResult;
        resolvedResult.status = Resolved;
        resolvedResult.value = value;
      }
    }, error => {
      if (newResult.status === Pending) {
        const rejectedResult = newResult;
        rejectedResult.status = Rejected;
        rejectedResult.value = error;
      }
    });
    const newResult = {
      status: Pending,
      value: thenable
    };
    entriesForResource.set(key, newResult);
    return newResult;
  } else {
    return entry;
  }
}