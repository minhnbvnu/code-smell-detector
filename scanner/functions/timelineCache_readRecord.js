function timelineCache_readRecord(record) {
  if (record.status === timelineCache_Resolved) {
    // This is just a type refinement.
    return record;
  } else if (record.status === timelineCache_Rejected) {
    // This is just a type refinement.
    return record;
  } else {
    throw record.value;
  }
}