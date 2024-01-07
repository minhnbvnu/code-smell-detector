function mergeGroups(groups) {
  let mergedAGroup = true;
  while (mergedAGroup) {
    mergedAGroup = attemptToMergeAGroup(groups);
  }
  return groups;
}