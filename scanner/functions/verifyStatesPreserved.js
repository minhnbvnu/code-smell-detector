function verifyStatesPreserved(lastInternalStates, statusDisplays) {
  let key;
  for (key in statusDisplays) {
    if (!statusDisplays.hasOwnProperty(key)) {
      continue;
    }
    if (lastInternalStates[key]) {
      expect(lastInternalStates[key]).toEqual(
        statusDisplays[key].getInternalState(),
      );
    }
  }
}