function inspectedElementCache_readRecord(record) {
  if (record.status === inspectedElementCache_Resolved) {
    // This is just a type refinement.
    return record;
  } else {
    throw record.value;
  }
}