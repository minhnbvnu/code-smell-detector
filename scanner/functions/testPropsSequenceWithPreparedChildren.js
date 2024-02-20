function testPropsSequenceWithPreparedChildren(sequence, prepareChildren) {
  const container = document.createElement('div');
  const parentInstance = ReactDOM.render(
    <FriendsStatusDisplay {...sequence[0]} prepareChildren={prepareChildren} />,
    container,
  );
  let statusDisplays = parentInstance.getStatusDisplays();
  let lastInternalStates = getInternalStateByUserName(statusDisplays);
  verifyStatuses(statusDisplays, sequence[0]);

  for (let i = 1; i < sequence.length; i++) {
    ReactDOM.render(
      <FriendsStatusDisplay
        {...sequence[i]}
        prepareChildren={prepareChildren}
      />,
      container,
    );
    statusDisplays = parentInstance.getStatusDisplays();
    verifyStatuses(statusDisplays, sequence[i]);
    verifyStatesPreserved(lastInternalStates, statusDisplays);
    verifyDomOrderingAccurate(container, statusDisplays);

    lastInternalStates = getInternalStateByUserName(statusDisplays);
  }
}