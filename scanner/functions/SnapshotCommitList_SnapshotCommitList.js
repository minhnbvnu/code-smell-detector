function SnapshotCommitList_SnapshotCommitList({
  commitData,
  commitTimes,
  filteredCommitIndices,
  selectedCommitIndex,
  selectedFilteredCommitIndex,
  selectCommitIndex,
  totalDurations
}) {
  return /*#__PURE__*/react["createElement"](index_esm["a" /* default */], null, ({
    height,
    width
  }) => /*#__PURE__*/react["createElement"](SnapshotCommitList_List, {
    commitData: commitData,
    commitTimes: commitTimes,
    height: height,
    filteredCommitIndices: filteredCommitIndices,
    selectedCommitIndex: selectedCommitIndex,
    selectedFilteredCommitIndex: selectedFilteredCommitIndex,
    selectCommitIndex: selectCommitIndex,
    totalDurations: totalDurations,
    width: width
  }));
}