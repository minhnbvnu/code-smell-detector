function SignonSaveState() {
  // Save selection
  let seln = signonsTreeView.selection;
  signonsTreeView._lastSelectedRanges = [];
  let rangeCount = seln.getRangeCount();
  for (let i = 0; i < rangeCount; ++i) {
    let min = {};
    let max = {};
    seln.getRangeAt(i, min, max);
    signonsTreeView._lastSelectedRanges.push({
      min: min.value,
      max: max.value,
    });
  }
}