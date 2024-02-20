function readRecord(record) {
  if (record.status === Resolved) {
    // This is just a type refinement.
    return record;
  } else if (record.status === Rejected) {
    // This is just a type refinement.
    return record;
  } else {
    throw record.value;
  }
}