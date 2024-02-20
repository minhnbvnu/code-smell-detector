function createInitialSplices(changeRecords) {
  const splices = [];

  for (let i = 0, ii = changeRecords.length; i < ii; i++) {
    const record = changeRecords[i];
    mergeSplice(splices, record.index, record.removed, record.addedCount);
  }

  return splices;
}