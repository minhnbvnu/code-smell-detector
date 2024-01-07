function getFiberColor(fibers, id) {
  if (fibers.currentIDs.indexOf(id) > -1) {
    return 'lightgreen';
  }
  if (id === fibers.workInProgressID) {
    return 'yellow';
  }
  return 'lightyellow';
}