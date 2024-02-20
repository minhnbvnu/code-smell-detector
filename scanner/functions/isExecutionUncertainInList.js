function isExecutionUncertainInList(paths, maxIndex) {
  for (let i = 0; i < maxIndex; i++) {
    const path = paths[i];

    if (isExecutionUncertain(path.parent.type, path.parentKey)) {
      return true;
    }
  }

  return false;
}