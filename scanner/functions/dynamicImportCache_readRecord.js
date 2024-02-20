function dynamicImportCache_readRecord(record) {
  if (record.status === dynamicImportCache_Resolved) {
    // This is just a type refinement.
    return record;
  } else if (record.status === dynamicImportCache_Rejected) {
    // This is just a type refinement.
    return record;
  } else {
    throw record.value;
  }
}