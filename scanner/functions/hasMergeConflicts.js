function hasMergeConflicts(str) {
  return str.includes(MERGE_CONFLICT_START) && str.includes(MERGE_CONFLICT_SEP) && str.includes(MERGE_CONFLICT_END);
}