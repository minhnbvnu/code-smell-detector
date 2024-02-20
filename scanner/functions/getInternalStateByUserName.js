function getInternalStateByUserName(statusDisplays) {
  return Object.keys(statusDisplays).reduce((acc, key) => {
    acc[key] = statusDisplays[key].getInternalState();
    return acc;
  }, {});
}